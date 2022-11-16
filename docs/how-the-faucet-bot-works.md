[← Go Back](../README.md)

## How the Faucet Bot Works

1. When the `/faucet` command is run, it will trigger the `execute()` function in `src/commands/faucet` file,

2. First, The bot will reads the user's message and fetch the `network` and `token` values, the user has requested for.

3. Then bot will validate the `network` and `token` combination is valid or not by executing the function `checkIsCombinationValid(network, token)` which will returns a boolean.

4. If returns `false` then the requested combination is `not valid`, and the bot will respond to the user with the below message and the execution will terminate.

   ```typescript
   `Ops! We do not supply ${token.toUpperCase()} token on ${capitalize(
     network
   )} network at the moment.`;
   ```

5. If returns `true` then the requested combination `is valid`, and the bot will call the below function.

   ```typescript
   await handleFaucetRequest(
     network, // network on which the user has requested the token
     token, // token that is requested by the user on the network
     interaction // discord bot interaction instance
   );
   ```

6. In `handleFaucetRequest()` function, first the bot will get the associated wallet address based on the user's discord id from the database using the below function.

   ```typescript
   // `interaction.user.id` is the discord id of the user who has requested the token
   const address = await getUserWalletAddress(interaction.user.id);
   ```

7. After that, the bot will get the `token` details object from the `faucetConfigurations` object.

8. Now, the bot will create a `combination` variable by combining `network` and `token` value with an underscore `_` which we will be using to fetch and save values in the database.

9. Then the bot will fetch the last requested date `fundLastRequestDate` for the `combination` using the `address` from the database.

   ```typescript
   const fundLastRequestDate = await getFundsLastRequestDate(
     address,
     combination
   );
   ```

10. The `getFundsLastRequestDate()` function will

    - fetch the database record based on the `address`

    - if the record is `not found` then it will return `0`

    - if the record is `found` then it will fetch the `fundLastRequestDate` for the combination

    - if last request date `exist` then it will returns the `timestamp`

    - if last request date `doest not exist` then it will return `0`

11. Once the above function is executed, the bot will check is the `fundLastRequestDate` exist or not.

12. If `not exist` i.e `fundLastRequestDate = 0` then the bot will call the `handleTransaction()` function.

13. If `exist` i.e `fundLastRequestDate = timestampValue` then the bot will check is their a time restriction active `isTimeRestrictionForFaucet` for the requested `token` by calling the `checkTimeRestrictionForFaucet()` function.

    ```typescript
    const { isTimeRestrictionForFaucet, duration } =
      await checkTimeRestrictionForFaucet(
        fundLastRequestDate,
        userRequestedToken.cooldown
      );
    ```

14. If the `isTimeRestrictionForFaucet = false` then, the bot will call the `handleTransaction()` function.

15. If the `isTimeRestrictionForFaucet = true` then, the bot will returns a message to the user informing about the Cooldown Time Remaining i.e `duration` for the `combination`, and the execution will terminate.

16. Now, in the `handleTransaction()`, first we call the `sendTokensOnNetwork()` function

    ```typescript
    const { txHash, provider, error } = await sendTokensOnNetwork(
      address, // user wallet address
      network, // network on which user requested the token
      userRequestedToken // tokens details object
    );
    ```

17. If the `txHash` is `null | undefined` or if the `error` is `true`, then then bot will returns an error message to the user and the execution will be terminated.

    ```typescript
    `Ops! An error occurred when processing ${token.toUpperCase()} on ${capitalize(
      network
    )}.`;
    ```

18. If the bot has the `txHash`, then it will get the `TransactionResponse` from the `getTransaction()` function offered in `ether` library.

    ```typescript
    const tx = await provider?.getTransaction(txHash);
    ```

19. Then the bot will send an `embed` message to the user informing about that the request is in `pending` status along with the `txHash` and the bot will wait until the transaction is processed.

20. Once the transaction is processed, the will update the `embed` message and inform user about the status i.e is transaction `success` or `failed`.

21. If the status is `success` then the bot will update the database with the new `timestamp` for the `combination` for network and `token` by calling the `updateFundsLastRequestDate()` function.

---

📄 The End

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
   
   <img width="342" alt="image" src="https://user-images.githubusercontent.com/52698465/202237712-82b4029f-653f-49ec-a988-54fccbbb634a.png">


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

    <img width="472" alt="SS-5" src="https://user-images.githubusercontent.com/52698465/202234899-23f9ed59-f897-49fe-9256-dfe1ccea3725.png">

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
    
    <img width="306" alt="image" src="https://user-images.githubusercontent.com/52698465/202238145-7f0c4f26-3790-4c9f-9b16-542f1f7d51d1.png">


18. If the bot has the `txHash`, then it will get the `TransactionResponse` from the `getTransaction()` function offered in `ether` library.

    ```typescript
    const tx = await provider?.getTransaction(txHash);
    ```

19. Then the bot will send an `embed` message to the user informing about that the request is in `pending` status along with the `txHash` and the bot will wait until the transaction is processed.

    <img width="479" alt="SS-3" src="https://user-images.githubusercontent.com/52698465/202234909-73f871c9-11de-43f7-ab15-540c9204df44.png">

20. Once the transaction is processed, the will update the `embed` message and inform user about the status i.e is transaction `success` or `failed`.

    <img width="474" alt="SS-4" src="https://user-images.githubusercontent.com/52698465/202234887-61657f8f-d722-48c5-b0cc-7e7b9d2d33b5.png">

21. If the status is `success` then the bot will update the database with the new `timestamp` for the `combination` for network and `token` by calling the `updateFundsLastRequestDate()` function.

---

📄 The End

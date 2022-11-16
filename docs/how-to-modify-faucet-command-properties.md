[← Go Back](../README.md)

## How to Modify the Faucet Command Properties

1. Navigate to `src/commands/faucet.ts file.

2. To change the `/faucet` command, update the value of `setName(<command_name>)` function, once done you can access it as `/<command_name>` in the discord.

3. To change the description of `/faucet` command, update the value of `setDescription(<description>)` function.

4. To add or modify the network options, configure the properties of first `addStringOption()` function

   - To change the name, update the `setName(<name>)` function. Once the name has been changed, update the `execute()` function where we are reading the networks choice value `interaction.options.getString("<name>")`

   - To change the description, update the `setDescription(<description>)` function.

   - To add or remove the network from choices, updated the choice object from the `addChoices()` function. You will also need to update the `Networks` enum and `faucetConfigurations` object.

      <img width="321" alt="SS-1" src="https://user-images.githubusercontent.com/52698465/202234905-09a30821-6eaa-4f66-a81a-ac0e87b592ef.png">

5. To add or modify the token options, configure the properties of second `addStringOption()` function

   - To change the name, update the `setName(<name>)` function. Once the name has been changed, update the `execute()` function where we are reading the tokens choice value `interaction.options.getString("<name>")`

   - To change the description, update the `setDescription(<description>)` function.

   - To add or remove the token choices, updated the choice object from the `addChoices()` function. You will also need to update the `Tokens` enum and `faucetConfigurations` object.

     <img width="352" alt="SS-2" src="https://user-images.githubusercontent.com/52698465/202234900-2bd35a52-ebf1-43d1-b18f-aa2fa7ea7889.png">

---

📄 The End

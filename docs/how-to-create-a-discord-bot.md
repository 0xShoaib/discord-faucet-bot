[← Go Back](../README.md)

## How to Create a Discord Bot on Discord Developers Portal

1. Go to [Discord Developers Portal](https://discord.com/developers/applications).

2. Under the `Applications` tab create a new application by clicking on `New Application` button on the top right corner.

3. Enter the name for your application, click `Create`.

4. Once your application is created, head over to `Bot` section from the left sidebar.

5. Click on `Add Bot` button and confirm the action.

6. (Optional)Choose a `username` and add an `icon` for your bot.

7. Click on `Reset Token` button to get your bot token, keep the token somewhere safe, we will be using that in `.env` later.

8. Now enable all the 3 toggle switches under the `Privileged Gateway Intents` menu and save the changes.

9. Once that is done, navigate to `OAuth2 URL Generator` by clicking on `OAuth2` tab and then `URL Generator` in the left sidebar menu.

10. Now check the `applications.commands` and `bot` checkboxes `SCOPES` table.

11. After that give the permissions to your bot from the `BOT PERMISSIONS` table according to your requirements.

12. For the faucet bot, I have selected the following permissions -

    - `Send Messages`
    - `Manage Messages`
    - `Embed Links`
    - `Read Message History`
    - `Use Slash Commands`

13. Once you have completed the above step, copy the `GENERATED URL` available at the very bottom on the same page.

14. Open the URL in a new window, you will be redirected to add the bot on to the server.

15. Select the server on which you want to add the bot and click `Continue`.

<img width="329" alt="DB-1" src="https://user-images.githubusercontent.com/52698465/202235948-82976d29-8396-4f20-8209-56d4d6630e79.png">


16. You will be able to see the permissions you are giving to the bot, once all checked click on `Authorize`.

<img width="289" alt="DB-2" src="https://user-images.githubusercontent.com/52698465/202235960-98b030de-8df4-417a-ad6d-e97a8d80da2b.png">

17. Once authorized, the bot will be added to your server.

---

📄 The End

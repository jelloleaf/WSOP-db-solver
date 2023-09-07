# WSOP DailyBlitz Solver
 
A script for fiddler that modifys outgoing web traffic to correctly solve each stage in the Dailyblitz minigame in the WSOP free-to-play poker app.

## Author
* Original Author of the script [reddit.com/user/chen914](https://www.reddit.com/user/chen914?)
  * [Original reddit thread](https://www.reddit.com/r/WSOP/comments/sg8doq/dailyblitz_jackpot_script/)
  
## Description

Script to solve always answer correctly when do the DailyBlitz activity in the free-to-play WSOP poker app.

## Getting Started

### Dependencies

* Windows 10
* Fiddler Classic https://www.telerik.com/fiddler/fiddler-classic

### Installing
* Download and install fiddler classic https://www.telerik.com/fiddler/fiddler-classic
  * Configure fiddler to decrypt HTTPS traffic following this short and easy guide [https://docs.telerik.com/fiddler/configure-fiddler/tasks/decrypthttps](https://docs.telerik.com/fiddler/configure-fiddler/tasks/decrypthttps)

  * In Fiddler, Click Rules > Customize Rules > File > Open, replace CustomRules.js with the one you downloaded.
  * ![enter image description here](https://i.imgur.com/c0riUYi.jpeg)

 * Right click the CustomRules.js that you downloaded and click edit or open with notepad. 
 * Select all (ctrl+A) and copy (ctrl+copy the code in the file and paste it into the Fiddler's custom rules window.
 * Make sure to click save before closing the window.
 * ![save the file](https://i.imgur.com/ryvPBjO.jpeg)
### Executing program

* Make sure the fiddler program is running in the background. If you did everything correctly, all you need to do is open playwsop.com in your webrowser and start a game of DailyBlitz. You can now answer with any choice and you will always get the guess correct.


<img src="https://i.imgur.com/wbJ8oJe.gif">

## Help

If something is unclear or you're having issues you can message me at "btwaids" on discord.

The original reddit thread might have an answer to your question, however, keep in mind that there are 2 versions of the script being discussed and it can be confusing to understand.


# MediaServer
This wants to be a project to access my video files and serve it via LAN

The structure is the following

```
├Videos
├----Course.01
|    └----Lecture.1
|    |      └----Lecture.01.mp4
|    |      └----Lecture.02.mp4
|    └----Lecture.2
|           └----Lecture.01.mp4
└----Course.02
     └----Lecture.1
     |      └----Lecture.02.mp4
     |      └----Lecture.03.mp4
     └----Lecture.2
            └----Lecture.02.mp4
            └----Lecture.03.mp4

```


## Known Issue (currently fixing)
1. The name of the file and the folders can't contain spaces or symbols now, maybe in the future version 
2. Totally not responsive
3. ~~Weird behaviour when changing time sometimes (need to investigate this)~~
4. ~~Set speed not working~~
5. Don't keep track of viewed files and completed Topics
6. ~~I have to finish the init script to initialize the Database~~ 
7. ~~Make an "installation" page for the first time one use it~~
8. ~~Add tooltip for Go and Speed~~
9. ~~Fix z-index bugged with ~ before on current_time|total_time~~
10. ~~Keypress conflict somethimes makes the website crash~~
11. ~~AJAX call for creating, deleting notes~~
     1. Render properly once note is saved
13. Store the last viewed videos in homepage with links
14. Configure next, previous video button
15. Mark as completed the video already seen





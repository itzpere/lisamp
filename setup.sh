#! /bin/bash
echo "-----------------------------------"
echo "-           LisAmp Setup          -"
echo "-             by pere             -"
echo "-----------------------------------"
echo -e "\nWhen running this setup config.json file will be rewriten"
echo -e "Type answers execly as said if 'YES' then don't type 'yes'\n"
read -p "Enter your secret bot token: " token
if [ -z "$token" ]
then 
echo "incorrect token"
echo "Setup Failed"
exit 0
else 
echo Done
fi
#Advanced Setup
echo -e "\nDo you want to go to advanced mode?\nThe default values will be writen for everything if NO"
read -p "YES / NO : " advancedMode
echo read
if [ -z "$advancedMode" ]; then
    echo -e "\nIncorrect input, it needs to be exacly the same"
    echo "Setup Failed"
    exit 0
fi
if [ $advancedMode != "YES" -a $advancedMode != "NO" ]; then
    echo "Incorrect input, it needs to be exacly the same"
    echo "Setup Failed"
    exit 0
elif [ $advancedMode == "YES" ]
    #prefix
    then
    echo "  Press ENTER if you want default option"
    echo -e "\nDefault prefix* | default is '!' :"
    read prefix
    if [ -z "$prefix" ]; then
    prefix="!"
    fi
#musicrole
    echo -e "\nDefault musicRole* | default is '' :"
    read musicrole
#repeat
    echo -e "\nDefault repeat* | default is 'off'\n   Options: OFF, QUEUE, TRACK, AUTOPLAY :"
    read repeat
if [ -z "$repeat" ]; then
    repeat=0
elif [ repeat == "QUEUE" ]; then
    repeat=1
elif [ repeat == "TRACK" ]; then
    repeat=2
elif [ repeat == "AUTOPLAY" ]; then
    repeat=3
else
    repeat=0
fi
#yt
    echo -e "\nYoutube cookie* | default is \"\" :"
    read ytcookie
#spotify
    echo -e "\nSpotify cookie | default is \"\" :"
    read spcookie
#write file
echo "{ \"token\" : \"$token\",\"prefix\" : \"$prefix\",\"musicrole\" : \"$musicrole\",\"repeat\" : \"$repeat\",\"ytcookie\" : \"$ytcookie\",\"spcookie\" : \"$spcookie\"}" > config.json
echo "Setup Complete"
exit 0
else
echo "{ \"token\" : \"$token\",\"prefix\" : \"!\",\"musicrole\" : \"\",\"repeat\" : \"0\",\"ytcookie\" : \"\",\"spcookie\" : \"\"}" > config.json
echo "Setup Complete"
fi

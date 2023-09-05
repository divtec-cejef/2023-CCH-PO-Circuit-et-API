# import dropbox
# import argparse
# import os
# import time
#
# token = 'sl.Blb41bjMl-hwqOMfZI4QXynSjwTIuHKHgcFttRgBBNTrBOuacfiwCF9435IzEovUUM7w5K5w12Adqb03irVIXhlRlcCjBzuHCYTM6vmttPNF94hLDLL_PDhVzhND-qgaJvAwT_1TswWt'
# dbx = dropbox.Dropbox(token)
# print(dbx.users_get_current_account())
# the_file_to_upload = "C:\\Users\\Admin\\Videos\\1.mp4"
import sys
from aifc import Error

import dropbox

from dropbox.files import WriteMode
from dropbox.exceptions import ApiError, AuthError

# Access token
TOKEN = 'sl.BlcTZafYNG2er5ve9XmcgzZhdk2vmDWbmQTEdN_1x_FXosNPUYA-pBIDg7m4oeC0Z6izKOqVBaLlC_TL7TuwgW8BMh3v_xbet9WmKGM0VpLG08-qkGyBD8kJQZSv7e4mCl5qpjzuvzbBJ4nCkj0Vr0Q'

UPLOADFOLDERPATH = '/Applications/PO-2023-DIVTEC-TUTURE/ ' # Keep the forward slash before destination filename


# Uploads contents of LOCALFILE to Dropbox
def upload(dbx, localfile: str, uploadname: str):
    uploadpath = UPLOADFOLDERPATH + uploadname
    with open(localfile, 'rb') as f:
        # We use WriteMode=overwrite to make sure that the settings in the file
        # are changed on upload
        print("Uploading " + localfile + " to Dropbox as " + uploadpath + "...")
        try:
            print(dbx.files_upload(f.read(), uploadpath, mode=WriteMode('overwrite')))
        except ApiError as err:
            # This checks for the specific error where a user doesn't have enough Dropbox space quota to upload this file
            if (err.error.is_path() and
                    err.error.get_path().error.is_insufficient_space()):
                sys.exit("ERROR: Cannot back up; insufficient space.")
            elif err.user_message_text:
                print(err.user_message_text)
                sys.exit()
            else:
                print(err)
                sys.exit()


# Adding few functions to check file details
def checkFileDetails(dbx):
    print("Checking file details")

    for entry in dbx.files_list_folder('').entries:
        print("File list is : ")
        print(entry.name)


# Run this script independently
def upload_file(local_file_path: str, uploadname: str):
    # Check for an access token
    if len(TOKEN) == 0:
        sys.exit("ERROR: Looks like you didn't add your access token. Open up backup-and-restore-example.py in a text "
                 "editor and paste in your token in line 14.")

    # Create an instance of a Dropbox class, which can make requests to the API.
    print("Creating a Dropbox object...")
    dbx = dropbox.Dropbox(TOKEN)

    # Check that the access token is valid
    try:
        dbx.users_get_current_account()
    except AuthError as err:
        sys.exit(
            "ERROR: Invalid access token; try re-generating an access token from the app console on the web.")

    try:
        checkFileDetails(dbx)
    except Error as err:
        sys.exit("Error while checking file details")

    print("Creating backup...")
    # Create a backup of the current settings file
    upload(dbx, local_file_path, uploadname)

    print("Done!")

    return dbx.sharing_create_shared_link_with_settings(UPLOADFOLDERPATH + uploadname).url

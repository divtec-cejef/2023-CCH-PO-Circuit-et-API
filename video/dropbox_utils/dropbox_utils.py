from dropbox.files import WriteMode
from dropbox.exceptions import ApiError, AuthError

import sys
import dropbox
import os

# Initialisation des constantes
UPLOADFOLDERPATH = '/Applications/PO-2023-DIVTEC-TUTURE/ '


def upload(dbx, localfile: str, uploadname: str):
    """
    Upload le fichier sur dropbox
    :param dbx: Dropbox
    :param localfile: Fichier à upload
    :param uploadname: Nom du fichier sur dropbox
    :return: none
    """

    # Création du path pour l'upload
    uploadpath = UPLOADFOLDERPATH + uploadname

    # Upload du fichier
    with open(localfile, 'rb') as f:
        try:
            print(dbx.files_upload(f.read(), uploadpath, mode=WriteMode('overwrite')))
        except ApiError as err:
            if (err.error.is_path() and
                    err.error.get_path().error.is_insufficient_space()):
                sys.exit("ERROR: Cannot back up; insufficient space.")
            elif err.user_message_text:
                sys.exit()
            else:
                print(err)
                sys.exit()


def upload_file(local_file_path: str, uploadname: str):
    """
    Upload le fichier sur dropbox
    :param local_file_path: Localisation du fichier
    :param uploadname: Nom du fichier sur dropbox
    :return: L'URL de partage du fichier
    """

    # Create an instance of a Dropbox class, which can make requests to the API.
    dbx = dropbox.Dropbox(os.environ['DROPBOX_TOKEN'])

    # Check that the access token is valid
    try:
        dbx.users_get_current_account()
    except AuthError as err:
        sys.exit(
            "ERROR: Invalid access token; try re-generating an access token from the app console on the web.")

    # Create a backup of the current settings file
    upload(dbx, local_file_path, uploadname)

    return dbx.sharing_create_shared_link_with_settings(UPLOADFOLDERPATH + uploadname).url

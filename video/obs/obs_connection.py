from obs.obs import Obs

# Initialise la connexion avec OBS
obs_connector = Obs()


def start_record():
    """
    Démarre l'enregistrement
    :return: none
    """
    obs_connector.start_record()


def change_sector(sector_num: int):
    """
    Change le secteur OBS
    :param sector_num: Numéro du secteur
    :return: none
    """
    obs_connector.change_sector(sector_num)


def stop_record():
    """
    Arrête l'enregistrement
    :return: none
    """
    obs_connector.stop_record()
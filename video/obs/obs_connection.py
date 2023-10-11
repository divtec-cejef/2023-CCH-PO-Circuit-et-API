from obs.obs import Obs

# Initialise la connexion avec OBS
obs_connector = Obs()


def start_record():
    """
    Démarre l'enregistrement
    :return: none
    """
    obs_connector.start_record()


def change_scene(scene: str):
    """
    Change la scene OBS
    :param scene: Nom de la scene
    :return: none
    """
    obs_connector.change_scene(scene)


def stop_record():
    """
    Arrête l'enregistrement
    :return: none
    """
    obs_connector.stop_record()
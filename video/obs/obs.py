import time

import obsws_python as obs


class Obs:
    """
    Class utilisée pour communiquer avec OBS
    """

    def __init__(self):
        """
        Constructeur de la classe Obs
        :return: none
        """
        self.cl = obs.ReqClient(host='localhost', port=4455, password='kfPjS8HbBvwhju8J')
        self.scenes = self.cl.get_scene_list().scenes

    def start_record(self):
        """
        Démarre l'enregistrement
        :return: none
        """
        if self.record_started():
            raise Exception("Record already started")
        self.change_scene('1')
        self.cl.start_record()

    def change_scene(self, scene: str):
        """
        Change la scene OBS
        :param scene: Nom de la scene
        :return: none
        """

        # Vérifie que le secteur est valide
        if scene not in self.get_possible_scene_names():
            raise Exception(f"{scene} is not a valid scene")

        self.cl.set_current_program_scene(scene)

    def stop_record(self):
        """
        Arrête l'enregistrement
        :return: none
        """
        if not self.record_started():
            raise Exception("Record not started")
        time.sleep(1)
        self.cl.stop_record()
        time.sleep(.5)
        self.change_scene('global')

    def get_possible_scene_names(self):
        """
        :return: les noms des scènes OBS
        """
        return [scene['sceneName'] for scene in self.scenes]

    def record_started(self):
        """
        :return: True si un enregistrement est lancé, false sinon
        """
        status = self.cl.get_record_status()
        return status.output_active

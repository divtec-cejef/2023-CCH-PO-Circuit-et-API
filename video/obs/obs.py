import obsws_python as obs


class Obs:
    def __init__(self):
        self.cl = obs.ReqClient(host='localhost', port=4455, password='kfPjS8HbBvwhju8J')
        self.scenes = self.cl.get_scene_list().scenes

    def start_record(self):
        self.change_sector(1)
        self.cl.start_record()

    def change_sector(self, sector_num: int):
        if str(sector_num) not in self.get_possible_scene_names():
            raise Exception(f"{sector_num} is not a valid sector")
        self.cl.set_current_program_scene(str(sector_num))

    def stop_record(self):
        self.cl.stop_record()

    def get_possible_scene_names(self):
        return [scene['sceneName'] for scene in self.scenes]

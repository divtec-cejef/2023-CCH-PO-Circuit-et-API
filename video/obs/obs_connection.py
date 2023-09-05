import obs
from obs.obs import Obs

obs_connector = Obs()


def start_record():
    obs_connector.start_record()


def change_sector(sector_num: int):
    obs_connector.change_sector(sector_num)


def stop_record():
    obs_connector.stop_record()
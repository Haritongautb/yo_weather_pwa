import { IOfflineCard } from "@/components";
import { LocalStorageEnum } from "./local-storage.service.interface";
export class LocalStorageService {
  static getFromLocalStorage() {
    if (typeof localStorage !== "undefined") {
      const place = JSON.parse(this.getItem(LocalStorageEnum.PLACE) || "null");
      const lat = +JSON.parse(this.getItem(LocalStorageEnum.LAT) || "null");
      const long = +JSON.parse(this.getItem(LocalStorageEnum.LONG) || "null");
      return {
        lat: lat !== null ? +lat : null,
        long: long !== null ? +long : null,
        place: place !== null ? place : null,
      };
    }
  }

  static setToLocalStorageCoordinates(data: { lat: number; long: number }) {
    this.createOrUpdateItem(LocalStorageEnum.LAT, JSON.stringify(data.lat));
    this.createOrUpdateItem(LocalStorageEnum.LONG, JSON.stringify(data.long));
  }

  static setToLocalStoragePlaceName(location_name: string) {
    this.createOrUpdateItem(
      LocalStorageEnum.PLACE,
      JSON.stringify(location_name)
    );
  }

  static setPlaces(data: IOfflineCard) {
    const places = JSON.parse(this.getItem(LocalStorageEnum.PLACES) ?? "null");
    if (places) {
      const placeIsExist = places.some(
        (item: {
          location_name: string;
          lat: number | string;
          long: number | string;
        }) =>
          item.location_name === data.location_name ||
          item.lat === data.lat ||
          item.long === data.long
      );

      if (placeIsExist) {
        return;
      }
      const updatedPlaces = [...places, data];
      return this.createOrUpdateItem(
        LocalStorageEnum.PLACES,
        JSON.stringify(updatedPlaces)
      );
    }
    return this.createOrUpdateItem(
      LocalStorageEnum.PLACES,
      JSON.stringify([data])
    );
  }

  static removeAllFromLocalStorage() {
    localStorage.removeItem(LocalStorageEnum.PLACE);
    localStorage.removeItem(LocalStorageEnum.LAT);
    localStorage.removeItem(LocalStorageEnum.LONG);
  }

  static createOrUpdateItem(name: string, value: string) {
    localStorage.setItem(name, value);
  }

  static getItem(name: string) {
    return typeof localStorage !== "undefined"
      ? localStorage.getItem(name)
      : null;
  }
}

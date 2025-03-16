import { isNullOrEmpty } from "../utils";
import { IMediaDataModel } from "./interfaces";

export class MediaDataModel {
    public guid: string;
    public fileName: string;
    public extension: string;
    public initiallyUploadedOn: string;
    public latestUploadOn: string;

    constructor() {
        this.guid = "";
        this.fileName = "";
        this.extension = "";
        this.initiallyUploadedOn = "";
        this.latestUploadOn = "";
    }

    public import(data: IMediaDataModel) {
        this.guid = data.guid ? data.guid : "";
        this.fileName = data.fileName;
        this.extension = data.extension;
        this.initiallyUploadedOn = data.initiallyUploadedOn ? data.initiallyUploadedOn : "";
        this.latestUploadOn = data.latestUploadOn ? data.latestUploadOn : "";
    }

    public isValid() {
        return !isNullOrEmpty(this.guid)
            && !isNullOrEmpty(this.fileName)
            && !isNullOrEmpty(this.extension);
    }
}
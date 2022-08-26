import {instance, ResponseType} from "./api";
import {PhotosType, ProfileType} from "../types/types";

type SavePhotoResponseDataType = {
	photos: PhotosType,
}
export const ProfileAPI = {
    getProfile(userId: number = 2) {
        return instance.get<ProfileType>(`/profile/${userId}`).then(response => response.data);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(response => response.data);
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status}).then(response => response.data);
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put<ResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(response => response.data);
    },

    saveProfile(profile: ProfileType) {
        return instance.put<ResponseType>(`profile`, profile).then(response => response.data);
    },
};
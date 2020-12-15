import React, { useState, useEffect, useContext } from 'react';
import { Button, Image, View, Platform, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import StoreContext from "../../store/StoreContext";

export default function ImagePickerExample() {
    const [image, setImage] = useState(null);
    const [uploaded, setUploaded] = useState(true);
    const [uploadedImgUrl, setUploadedImgUrl] = useState(null);

    const [appState, setAppState] = useContext(StoreContext);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    async function uploadImageAsync(uri) {
        setUploaded(false);
        let result = await appState.mediaUploadService.upload(uri)
        console.log(result)
        setUploadedImgUrl(result.location);
        setUploaded(true);
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Button title="Upload Image" onPress={() => uploadImageAsync(image)} />
            {uploaded
                ? <Image source={{ uri: uploadedImgUrl }} style={{ width: 200, height: 200 }} />
                : <ActivityIndicator size="small" color="#0000ff" />
            }
        </View>
    );
}
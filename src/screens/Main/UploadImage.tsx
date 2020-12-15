import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
    const [image, setImage] = useState(null);
    const [uploaded, setUploaded] = useState(true);
    const [uploadedImgUrl, setUploadedImgUrl] = useState(null);

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
        let apiUrl = 'http://localhost:80/media/upload';

        // Note:
        // Uncomment this if you want to experiment with local server
        //
        // if (Constants.isDevice) {
        //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
        // } else {
        //   apiUrl = `http://localhost:3000/upload`
        // }

        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];

        let formData = new FormData();
        const uploadUri = Platform.OS === "android" ? uri : uri.replace("file://", "");
        const fileObject: any = {
            uri: uploadUri,
            "name": `photo.${fileType}`,
            'type': `image/${fileType}`,
        }
        formData.append("file", fileObject);
        let options = {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        };

        fetch(apiUrl, options)
            .then(res => res.json())
            .then(res => {
                setUploadedImgUrl(res.location);
                setUploaded(true);
            })
            .catch(err => {
                console.log('err', err);
            });
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
import Axios from 'axios'
import { Group, Text, useMantineTheme, MantineTheme } from '@mantine/core';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import {getIconColor, ImageUploadIcon} from './script'

export default function FileUploader() {
    const theme = useMantineTheme();

    const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
        <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
            <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />
    
            <div>
                <Text size="xl" inline>
                    Drag images here or click to select files
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not exceed 5mb
                </Text>
            </div>
        </Group>
    );

    const uploadImage = (image: any) => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "icyemhhs")
        data.append("cloud_name", "dmythh2na")
        Axios.post("https://api.cloudinary.com/v1_1/dmythh2na/image/upload", data).then(response => response).catch(err => console.log(err))
    }

    return (
        <Dropzone
        onDrop={(files) => uploadImage(files[0])}
            onReject={(files) => console.log('rejected files', files[0])}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
        >
            {(status) => dropzoneChildren(status, theme)}
        </Dropzone>
    );
}
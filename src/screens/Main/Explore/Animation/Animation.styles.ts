import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B202B',
    },
    animationComponent: {
        marginTop: 40,
        width: 400,
        height: 600,
        overflow: 'hidden',
        backgroundColor: '#1B202B',
    },
    details: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullname: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    location: {
        color: '#BEC0CC',
        textTransform: 'uppercase',
    },
    biography: {
        marginTop: 8,
        color: '#DEE3EE',
        fontSize: 18,
        width: 300,
        textAlign: 'center',
        lineHeight: 26,
    },
    followButton: {
        marginTop: 52,
        borderRadius: 99,
        borderWidth: 1,
        borderColor: '#fff',
        paddingHorizontal: 64,
        paddingVertical: 14,
    },
    followButtonText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#FFFFFF',
    },
    avatarAnimationContainer: {
        position: 'absolute',
        width: 90,
        height: 90,
        borderRadius: 50,
    },
    avatarWrapper: {
        borderRadius: 50,
        flex: 1,
    },
    avatarImage: {
        width: 90,
        height: 90,
        borderRadius: 50,
    },
});

import React, { useState } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import _ from 'lodash';

import users from './mock-users';
import AnimationManager from './animation-manager';

import styles from './Animation.styles';

const ExploreUsers = () => {
    const animationManager = new AnimationManager(
        users,
        styles.avatarAnimationContainer.width
    );
    const initialPositions = animationManager.calculateInitialPositions();

    const [selectedUser, setSelectedUser] = useState();
    const [detailsAnimationState, setDetailsAnimationState] = useState({
        opacity: 0,
        translateY: 0,
    });
    const [animationsState, setAnimations] = useState(
        initialPositions.map((item) => item)
    );

    const animations = useSharedValue(animationsState);
    const detailsAnimation = useSharedValue(detailsAnimationState);

    let animationTimeoutId;

    const avatarAnimationStyle = (index) =>
        useAnimatedStyle(() => {
            return {
                transform: [
                    { translateX: withSpring(animations.value[index].x) },
                    { translateY: withSpring(animations.value[index].y) },
                ],
            };
        });

    const detailsAnimationStyle = useAnimatedStyle(() => {
        return {
            opacity: withDelay(
                100,
                withTiming(detailsAnimation.value.opacity, {
                    duration: 300,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                })
            ),
            transform: [
                {
                    translateY: withDelay(
                        detailsAnimation.value.opacity ? 20 : 400,
                        withSpring(detailsAnimation.value.translateY)
                    ),
                },
            ],
        };
    });

    const handleAvatarPress = (user) => {
        const isDetailsOpened = detailsAnimationState.opacity;
        const sameUserClicked = user === selectedUser;

        if (isDetailsOpened && sameUserClicked) {
            setAnimations(animationManager.calculateInitialPositions());
            setDetailsAnimationState({
                opacity: 0,
                translateY: 0,
            });

            return;
        }

        clearTimeout(animationTimeoutId);

        setDetailsAnimationState({
            opacity: 0,
            translateY: 0,
        });

        animationTimeoutId = setTimeout(() => {
            setDetailsAnimationState({
                opacity: 1,
                translateY: 20,
            });

            setSelectedUser(user);
        }, 300);

        setAnimations(animationManager.calculateAfterMovingPositions(user));
    };

    const handleContainerPress = () => {
        setDetailsAnimationState({
            opacity: 0,
            translateY: 0,
        });

        setAnimations(animationManager.calculateInitialPositions());
    };

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.animationComponent}
                onPress={handleContainerPress}
            >
                <Animated.View style={[styles.details, detailsAnimationStyle]}>
                    {selectedUser && (
                        <>
                            <Text style={styles.fullname}>
                                {selectedUser.name.first} {selectedUser.name.last}
                            </Text>

                            <Text style={styles.location}>
                                {selectedUser.location.country}
                            </Text>

                            <Text style={styles.biography}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                                faucibus felis non leo dictum, non feugiat arcu consequat.
              </Text>

                            <TouchableOpacity style={styles.followButton}>
                                <Text style={styles.followButtonText}>Follow</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </Animated.View>

                {users.map((user, index) => (
                    <Animated.View
                        key={index}
                        style={[
                            styles.avatarAnimationContainer,
                            avatarAnimationStyle(index),
                        ]}
                    >
                        <Pressable
                            style={styles.avatarWrapper}
                            onPress={() => handleAvatarPress(user)}
                        >
                            <Image
                                style={styles.avatarImage}
                                source={{ uri: user.picture.large }}
                            />
                        </Pressable>
                    </Animated.View>
                ))}
            </Pressable>
        </View>
    );
};

export default ExploreUsers;

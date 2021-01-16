import React, { useState, useLayoutEffect } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import WorkInputGroup from "./WorkInputGroup";
import HeaderBackButton from "./HeaderBackButton"

const Work = (props) => {
    const { updateEditProfileState, keyName, editProfileState } = props.route.params
    const [workExperience, setWorkExperience] = useState(editProfileState[keyName])

    console.log("workExperience", workExperience)

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: (() => <HeaderBackButton goBack={() => onGoBack()} />)
        });
    }, [props.navigation]);

    const onGoBack = () => {
        updateEditProfileState({ workExperience })
        props.navigation.pop()
    }

    const renderWorkExperiences = () => {
        return workExperience?.map(workExperience => {
            return (
                <WorkInputGroup workExperience={workExperience} />
            )
        })
    }

    return (
        <>
            <Text>Work</Text>
            <View>
                {renderWorkExperiences()}
            </View>
        </>
    );
};

// organizationName: String
// startYear: Int
// endYear: Int
// title: String

const Input = styled.TextInput`
  height: 50px;
  background-color: #ddd;
  margin-bottom: 10px;
  padding: 8px;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

export default Work;

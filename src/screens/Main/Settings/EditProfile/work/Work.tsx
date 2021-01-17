import React, { useState, useLayoutEffect, useContext } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import WorkInputGroup from "./WorkInputGroup";
import HeaderBackButton from "../components/HeaderBackButton"
import WorkContext from "./store/WorkContext"

const Work = (props) => {
    const { updateEditProfileState, keyName, editProfileState } = props.route.params
    const [workExperience, setWorkExperience] = useContext(WorkContext)

    console.log("userid", editProfileState.id)
    console.log("workExperience", workExperience)

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: (() => <HeaderBackButton goBack={() => onGoBack()} />)
        });
    }, [props.navigation]);

    const onGoBack = () => {
        props.navigation.pop()
        console.log("workExperience in Work on go back", workExperience)
        updateEditProfileState({ workExperience })
    }

    const renderWorkExperiences = () => {
        return workExperience?.map((workExperienceObject, index) => {
            return (
                <WorkInputGroup allWorkExperience={workExperience} workExperience={workExperienceObject} setWorkExperience={setWorkExperience} index={index} key={index} />
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

import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import WorkInputGroup from "./WorkInputGroup";
import HeaderBackButton from "../components/HeaderBackButton"
import WorkContext from "./store/WorkContext"

const Work = (props) => {
    const { updateEditProfileState } = props.route.params
    const [workExperience, setWorkExperience] = useContext(WorkContext)

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: (() => <HeaderBackButton goBack={onGoBack} />)
        });
    }, [props.navigation]);

    console.log("workExperience on render in Work", workExperience)

    const onGoBack = () => {
        props.navigation.pop()
    }

    useEffect(() => {
        updateEditProfileState({ workExperience })
    }, [workExperience])

    const renderWorkExperiences = () => {
        return workExperience?.map((workExperienceObject, index) => {
            console.log(workExperienceObject)
            return (
                <WorkInputGroup workExperienceObject={workExperienceObject} index={index} key={index} />
            )
        })
    }

    console.log("work re-rendered")

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

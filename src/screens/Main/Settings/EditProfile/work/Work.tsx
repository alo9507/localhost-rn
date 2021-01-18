import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import { View, Text, Button } from "react-native";
import styled from "styled-components/native";
import WorkInputGroup from "./WorkInputGroup";
import HeaderBackButton from "../components/HeaderBackButton"
import WorkContext from "./store/WorkContext"
import WorkExperience from "../../../../../models/WorkExperience";

const Work = (props) => {
    const { updateEditProfileState } = props.route.params
    const [workExperience, setWorkExperience] = useContext(WorkContext)

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: (() => <HeaderBackButton goBack={onGoBack} />)
        });
    }, [props.navigation]);

    const onGoBack = () => {
        props.navigation.pop()
    }

    useEffect(() => {
        updateEditProfileState({ workExperience })
    }, [workExperience])

    const renderWorkExperiences = () => {
        return workExperience?.map((workExperienceObject, index) => {
            return (
                <WorkInputGroup workExperienceObject={workExperienceObject} index={index} key={index} />
            )
        })
    }

    const addWorkInputGroup = () => {
        let updatedWorkExperience = []
        const newWorkExperience = new WorkExperience("", "", 1000, 2000)

        if (workExperience === null) {
            updatedWorkExperience = []
            updatedWorkExperience = [newWorkExperience]
        } else {
            updatedWorkExperience = [...workExperience, newWorkExperience]
        }

        setWorkExperience({ type: "UPDATE_WORK_EXPERIENCE", payload: updatedWorkExperience })
    }

    return (
        <>
            <Text>Work</Text>
            <View>
                {renderWorkExperiences()}
                <Button title={"Add Work Experience"} onPress={addWorkInputGroup} />
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

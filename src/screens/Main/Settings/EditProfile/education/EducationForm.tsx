import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import { View, Text, Button } from "react-native";
import styled from "styled-components/native";
import EducationInputGroup from "./EducationInputGroup";
import HeaderBackButton from "../components/HeaderBackButton"
import EducationContext from "./store/EducationContext"
import Education from "../../../../../models/Education"

const EducationForm = (props) => {
    const { updateEditProfileState } = props.route.params
    const [education, setEducation] = useContext(EducationContext)

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: (() => <HeaderBackButton goBack={() => onGoBack()} />)
        });
    }, [props.navigation]);

    const onGoBack = () => {
        props.navigation.pop()
    }

    useEffect(() => {
        updateEditProfileState({ education })
    }, [education])

    const renderEducation = () => {
        return education?.map((educationObject, index) => {
            return (
                <EducationInputGroup educationObject={educationObject} index={index} key={index} />
            )
        })
    }

    const addEducationInputGroup = () => {
        let updatedEducation = []
        const newEduation = new Education("", "", "highschool", 2012, 2012)

        if (education === null) {
            updatedEducation = []
        } else {
            updatedEducation = [...education, newEduation]
        }

        setEducation({ type: "UPDATE_EDUCATION", payload: updatedEducation })
    }

    return (
        <>
            <Text>Education</Text>
            <View>
                {renderEducation()}
                <Button title={"Add Education"} onPress={addEducationInputGroup} />
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

export default EducationForm;

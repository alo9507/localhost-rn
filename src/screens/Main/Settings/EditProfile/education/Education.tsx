import React, { useState, useLayoutEffect, useContext } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import EducationInputGroup from "./EducationInputGroup";
import HeaderBackButton from "../components/HeaderBackButton"
import EducationContext from "./store/EducationContext"

const Education = (props) => {
    const { updateEditProfileState, keyName, editProfileState } = props.route.params
    const [education, setEducation] = useContext(EducationContext)

    console.log("userid", editProfileState.id)
    console.log("education", education)

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: (() => <HeaderBackButton goBack={() => onGoBack()} />)
        });
    }, [props.navigation]);

    const onGoBack = () => {
        props.navigation.pop()
        console.log("education in Education on go back", education)
        updateEditProfileState({ education })
    }

    const renderEducation = () => {
        console.log("education in education comp", education)
        return education?.map((educationObject, index) => {
            return (
                <EducationInputGroup allEducation={education} education={educationObject} setEducation={setEducation} index={index} key={index} />
            )
        })
    }

    return (
        <>
            <Text>Education</Text>
            <View>
                {renderEducation()}
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

export default Education;

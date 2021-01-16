import React, { useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import WorkInputGroup from "./WorkInputGroup";

const Work = (props) => {
    const { updateEditProfileState, keyName, editProfileState } = props.route.params
    const [workExperiences, setWorkExperience] = useState(editProfileState[keyName])

    const renderWorkExperiences = () => {
        return workExperiences?.map(workExperience => {
            return (
                <WorkInputGroup workExperience={workExperience} />
            )
        })
    }

    return (
        <>
            <Text>Work: {workExperiences}</Text>
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

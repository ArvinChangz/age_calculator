import React from "react";
import styled from "styled-components";

const Container = styled.div`
display: flex;
flex-direction: column;
width: 300px;
`;

const LabelText = styled.label`
display: flex;
justify-content: flex-start;
font-size: 12px;
margin-bottom: 8px;
`;

const InputContainer = styled.div`
display: flex;
flex-direction: row;
`;

const InputSelectContainer = styled.select.attrs(props => ({
    isLeft: props.isLeft || false, isError: props.isError || false
}))`
display: flex;
justify-content: center;
align-items: center;
background-color: white;
color: black;
font-size: 12px;
width: 45%;
height: 36px;
border-radius: ${props => props.isLeft ? "4px 0px 0px 4px" : "0px 4px 4px 0px"};
border: ${props => props.isError ? "1px solid red" : `1px solid rgba(138, 132, 132, 1)`};
padding-left: 4px;
`;

const InputBetweenContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.color.ContainerBackground};
color: black;
font-size: 12px;
width: 10%;
border-top: 1px solid ${props => props.theme.color.LabelText};
border-bottom: 1px solid ${props => props.theme.color.LabelText};
`;

const ErrorHint = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
height: 28px;
background-color: rgba(255, 0, 0, 0.2);
font-size: 12px;
color: ${props => props.theme.color.Error};
padding-left: 4px;
`;

const AgeGroupSelect = ({ index, result, onChangeResult, ageArray, isOverlap }) => {

    // 更新result
    const updateAgeGroup = (subIndex, newValue) => {

        const updatedResult = result.map((item, i) => {
            if (i === index) {
                const updatedAgeGroup = [...item.ageGroup];

                newValue = parseInt(newValue);

                // 修改ageGroup
                if (subIndex === 0 && updatedAgeGroup[1] < newValue) {
                    updatedAgeGroup[0] = newValue;
                    updatedAgeGroup[1] = newValue;
                } else {
                    updatedAgeGroup[subIndex] = newValue;
                };

                return { ...item, ageGroup: updatedAgeGroup };
            };

            return item;
        });

        onChangeResult(updatedResult);
    };

    return (
        <Container>
            <LabelText>年齡</LabelText>
            <InputContainer>
                <InputSelectContainer
                    isLeft
                    isError={isOverlap}
                    value={result[index].ageGroup[0]}
                    onChange={event => updateAgeGroup(0, event?.target?.value)}
                >
                    {ageArray.map((x, i) => {
                        if (result[index]?.ageGroup[1] >= x.value) {
                            return (
                                <option key={`AgeStartOption${index}-${i}`} value={x.value}>{x.key}</option>
                            )
                        } else {
                            return null
                        }
                    })}
                </InputSelectContainer>
                <InputBetweenContainer>~</InputBetweenContainer>
                <InputSelectContainer
                    isLeft={false}
                    isError={isOverlap}
                    value={result[index].ageGroup[1]}
                    onChange={event => updateAgeGroup(1, event?.target?.value)}
                >
                    {ageArray.map((x, i) => {
                        if (result[index]?.ageGroup[0] <= x.value) {
                            return (
                                <option key={`AgeEndOption${index}-${i}`} value={x?.value}>{x?.key}</option>
                            )
                        } else {
                            return null
                        }
                    })}
                </InputSelectContainer>
            </InputContainer>
            {isOverlap
                ? (<ErrorHint>年齡區間不可重疊</ErrorHint>)
                : null}
        </Container>
    )
}

export default AgeGroupSelect
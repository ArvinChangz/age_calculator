import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PriceInput from "./PriceInput";
import AgeGroupSelect from "./AgeGroupSelect";

const Container = styled.div`
display: flex;
flex-direction: column;
width: 650px;
`;

const ItemContainer = styled.div`
display: flex;
flex-direction: column;
`;

const LabelTitleContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const LabelTitleText = styled.label`
display: flex;
flex-direction: row;
font-size: 24px;
margin-bottom: 16px;
`;

const ChangeContainer = styled.button`
display: flex;
flex-direction: row;
align-items: center;
background: transparent;
border: none;
cursor: pointer;
`;

const ChangeText = styled.p.attrs(props => ({
    isError: props.isError || false, isDisabled: props.isDisabled || false
}))`
font-size: 12px;
color: ${props => props.isDisabled
        ? props.theme.color.ContainerBackground
        : props.isError
            ? props.theme.color.Error
            : props.theme.color.AddText};
margin-left: 8px;
`;

const RowContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`;

const SeperateLine = styled.div`
width: 100%;
height:1px;
border: none;
background-color: ${props => props.theme.color.ContainerBackground};
margin-top: 32px;
`;


const AgeArray = Array.from({ length: 21 }, (v, i) => { return { key: `${i}`, value: i } });

const AgeGroupPriceList = ({ result, setResult, onChange }) => {

    const [isOverlap, setIsOverlap] = useState(false);
    const [isNotInclude, setIsNotInclude] = useState(false);

    const addResult = () => {
        setResult([...result, { ageGroup: [0, 20], price: 0 }]);
    };

    const removeResult = (indexToRemove) => {
        const updatedResult = result.filter((item, index) => index !== indexToRemove);
        setResult(updatedResult);
    };

    // 驗證Select
    const getNumberIntervals = (intervals) => {

        let overlap = []; // 重疊
        let notInclude = []; // 未包含

        if (intervals && intervals.length > 0) {
            const sortIntervals = intervals.sort((a, b) => a[0] - b[0]); // 排序

            let left = sortIntervals[0][1];

            // 處理初始未包含的部分
            if (sortIntervals[0][0] > 0) {
                notInclude.push([0, sortIntervals[0][0] - 1]);
            };

            if (sortIntervals.length > 1) {
                for (let i = 0; i < sortIntervals.length - 1; i++) {
                    if (sortIntervals[i][1] >= sortIntervals[i + 1][0]) { // 重疊放入overlap
                        if (sortIntervals[i + 1][1] >= sortIntervals[i][1]) {
                            overlap.push([sortIntervals[i + 1][0], sortIntervals[i][1]]);
                        };
                    } else {
                        if (sortIntervals[i + 1][0] - sortIntervals[i][1] > 1)
                            notInclude.push([left + 1, sortIntervals[i + 1][0] - 1]);
                    }

                    left = Math.max(left, sortIntervals[i + 1][1]); // 更新結束點
                };
            };

            // 處理結束未包含的部分
            if (left < 20) {
                notInclude.push([left + 1, 20]);
            };
        };

        return {
            overlap: overlap,
            notInclude: notInclude
        };

    };

    useEffect(() => {
        setIsOverlap(getNumberIntervals(result.map(item => item.ageGroup)).overlap.length > 0 ? true : false);
        setIsNotInclude(getNumberIntervals(result.map(item => item.ageGroup)).notInclude.length > 0 ? true : false);
    }, [result]);

    useEffect(() => {
        if (result.length > 0) {
            onChange(result);
        };
    }, [result, onChange]);


    return (
        <Container>
            {result.map((x, i) => {
                return (
                    <ItemContainer key={`Item-${i}`}>
                        <LabelTitleContainer>
                            <LabelTitleText>{`價格設定 - ${i + 1}`}</LabelTitleText>
                            {i
                                ? (<ChangeContainer onClick={() => { removeResult(i); }}>
                                    <svg fill={`rgb(255, 0, 0)`} width="10px" height="10px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fill-rule="evenodd" />
                                    </svg>
                                    <ChangeText isError>移除</ChangeText>
                                </ChangeContainer>)
                                : null}
                        </LabelTitleContainer>
                        <RowContainer>
                            <AgeGroupSelect
                                index={i}
                                result={result}
                                ageArray={AgeArray}
                                onChangeResult={setResult}
                                isOverlap={isOverlap}
                            />
                            <PriceInput
                                index={i}
                                result={result}
                                onChangeResult={setResult}
                            />
                        </RowContainer>
                        <SeperateLine />
                    </ItemContainer>
                )
            })}
            <ChangeContainer
                disabled={!isNotInclude}
                onClick={() => { addResult(); }}>
                <svg fill="none" width="12px" height="12px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12H20M12 4V20" stroke={isNotInclude ? "rgba(25, 196, 189, 1)" : "rgba(138, 132, 132, 0.25)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <ChangeText
                    isError={false}
                    isDisabled={!isNotInclude}
                >新增價格設定</ChangeText>
            </ChangeContainer>
        </Container>
    )
}

export default AgeGroupPriceList
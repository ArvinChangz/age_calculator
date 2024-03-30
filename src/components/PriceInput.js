import React, { useEffect, useState } from "react";
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
color: ${props => props.theme.color.LabelText};
`;

const InputContainer = styled.div`
display: flex;
flex-direction: row;
`;

const InputCurrrencyContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.color.ContainerBackground};
color:  ${props => props.theme.color.TitleText};
font-size: 12px;
width: 20%;
height: 36px;
border-radius: 4px 0px 0px 4px;
border: 1px solid ${props => props.theme.color.LabelText};
`;

const InputTextContainer = styled.input.attrs(props => ({
    isError: props.isError || false
}))`
display: flex;
justify-content: center;
align-items: center;
background-color: white;
color: ${props => props.theme.color.TitleText};
font-size: 12px;
width: 80%;
border-radius: 0px 4px 4px 0px;
border: ${props => props.isError ? "1px solid red" : `1px solid rgba(138, 132, 132, 1)`};
border-left: none;
padding-left: 4px;
`

const Hint = styled.p`
display: flex;
justify-content: flex-end;
align-items: center;
font-size: 12px;
margin-top: 4px;
color: ${props => props.theme.color.LabelText};
`;

const ErrorHint = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
height: 28px;
background-color: ${props => props.theme.color.ErrorBackground};
font-size: 12px;
color: ${props => props.theme.color.Error};
padding-left: 4px;
`;



const PriceInput = ({ index, result, onChangeResult }) => {

    const [inputPrice, setInputPrice] = useState((result[index].price).toString());

    // 千分位加入逗號
    const addComma = (inputPrice) => {
        const strPrice = String(inputPrice); // 確認是String
        let parts = strPrice.split('.'); // 分割整数部分和小数部分
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 添加逗號
        return parts.join('.'); // 重新組合
    };

    // 字串輸入驗證，確保服好及小數點只加入一次且位置正確
    const formatInput = (input) => {

        let filtered = input.replace(/[^0-9.-]/g, ''); // 移除不允許得字符

        // 移除不在開頭的負號
        if (filtered.indexOf('-') > 0) {
            filtered = filtered.replace(/-/g, '');
        };
        // 確保負號只出現在開頭
        if (filtered.startsWith('-')) {
            filtered = '-' + filtered.slice(1).replace(/-/g, '');
        }

        // 確保只有一個小數點
        const dotOccurrences = filtered.match(/\./g) || [];
        if (dotOccurrences.length > 1) {
            // 僅保留第一個小數點
            let firstDotIndex = filtered.indexOf('.');
            filtered = filtered.slice(0, firstDotIndex + 1) +
                filtered.slice(firstDotIndex).replace(/\./g, '');
        };

        return filtered;
    };

    const handleInputChange = (eventValue) => {
        // 更新inputPrice
        const input = formatInput(eventValue); // 只允許數字和小數點
        setInputPrice(input);

        // 更新result
        const updatedItems = [...result];
        if (index >= 0 && index < updatedItems.length) {
            updatedItems[index] = {
                ...updatedItems[index],
                price: parseFloat(input) ? parseFloat(input) : 0
            };

            // 設置新的狀態
            onChangeResult(updatedItems);
        };
    };

    useEffect(() => {
        const price = result[index].price;
        // 檢查價格是否以小數點結尾
        if ((!inputPrice.endsWith('.') && !inputPrice.endsWith('-')) && inputPrice) {
            setInputPrice(price.toString());
        };
    }, [result, index, inputPrice]);

    return (
        <Container>
            <LabelText>入住費用（每人每晚）</LabelText>
            <InputContainer>
                <InputCurrrencyContainer>TWD</InputCurrrencyContainer>
                <InputTextContainer
                    isError={!inputPrice}
                    placeholder="請輸入費用"
                    type="text"
                    value={addComma(inputPrice)}
                    onChange={event => handleInputChange(event.target.value)}
                />
            </InputContainer>
            {!inputPrice
                ? (<ErrorHint>不可以為空白</ErrorHint>)
                : null}
            <Hint>輸入0表示免費</Hint>
        </Container>
    )
}

export default PriceInput
import React, {
    useEffect,
    useState
} from "react";
import {
    Grid
} from "@material-ui/core";
// import { useTheme } from "@material-ui/styles";
// styles
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import UseCaseCard from "../../components/UseCaseCard"
import {
    fetchBusinessItemsInfo,
    fetchBusinessPromptInfo,
} from '../../api/mutations.js'
import {useQuery} from "react-query";
export default function UseCaseManagement(props) {
    const [ promptList, setPromptList ] = useState([])
    const [totalMenuList, setTotalMenuList] = useState([])
    const { data: businessPromptInfo, isLoading : businessPromptInfoIsLoading, isError: businessPromptInfoIsError } = useQuery('businessPromptInfo', fetchBusinessPromptInfo);
    // const theme = useTheme();
    useEffect(() => {
        if (!businessPromptInfoIsLoading && !businessPromptInfoIsError && businessPromptInfo) {
            // 데이터가 로드되었고, 에러가 없을 경우 상태 업데이트
            setPromptList(businessPromptInfo.data.sort((a, b) => a.id - b.id));
        }
    }, [businessPromptInfo, businessPromptInfoIsLoading, businessPromptInfoIsError]);
    const { data: businessItemsInfo, isLoading : businessItemsInfoIsLoading, isError: businessItemsInfoIsError } = useQuery('businessItemsInfo', fetchBusinessItemsInfo);
    useEffect(() => {
        if (!businessItemsInfoIsLoading && !businessItemsInfoIsError && businessItemsInfo) {
            const allItems = businessItemsInfo.data
                .map(category => category.items)
                .reduce((acc, curr) => acc.concat(curr), []);
            setTotalMenuList(allItems);
        }
    }, [businessItemsInfo, businessItemsInfoIsLoading, businessItemsInfoIsError]); // 의존성 배열에 businessInfo, isLoading, isError를 추가
    return (
        <>
            <PageTitle title="주미 학습하기"/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Widget disableWidgetMenu>
                        {promptList.map((prompt) => {
                            return <UseCaseCard
                                key={prompt.id}
                                id={prompt.id}
                                question={prompt.question}
                                updatePrompt={setPromptList}
                                items={prompt.items}
                                answer={prompt.answer}
                                menuList={totalMenuList}
                            />
                        })}
                    </Widget>
                </Grid>
            </Grid>
        </>
);
}



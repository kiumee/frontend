import React, {useEffect, useState} from "react";
import {
  Grid,
  CircularProgress,
  Button,
  Tabs,
  Tab,
  TextField,
  DialogTitle, DialogContent, DialogActions, Dialog
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import CustomCard from "../../components/Card";
import CollectionsIcon from "@material-ui/icons/Collections";
import useStyles from "./styles";
import {signOut, useUserDispatch} from "../../context/UserContext";
import classNames from "classnames";
import {
  useSignupMutation,
  useLoginMutation,
  useImageUploadMutation,
  useBusinessCreateMutation,
  fetchBusinessList
} from '../../api/mutations.js';
import {useQuery} from "react-query";

function Login(props) {
  const classes = useStyles();
  const [cardData, setCardData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("id_token"))
  const [isLoading, setIsLoading] = useState(false);
  const [activeTabId, setActiveTabId] = useState(0);
  const [selectCompany, setSelectCompany] = useState(isLoggedIn)
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState({name: '', description: '', imageUrl: '', prompt: ""}); // 새 항목의 상태
  const [cardImagePreview, setCardImagePreview] = useState(null);
  const userDispatch = useUserDispatch();
  const { data: businessList, isLoading: businessListIsLoading, isError: businessListIsError } = useQuery(
      'businessList',
      fetchBusinessList,
      {
        enabled: isLoggedIn
      }
  );
  useEffect(() => {
    if (!businessListIsLoading && !businessListIsError && businessList) {
        setCardData(businessList.data);
    }
  }, [businessList, businessListIsLoading, businessListIsError]);
  const handleSignupSuccess = (data) => {
    // 로그인 성공 후 처리할 로직
    setIsLoading(false);
    localStorage.setItem('id_token', data.token.accessToken)
    setSelectCompany(true)
    setIsLoggedIn(true)
  };
  const handleSignupError = (error) => {
    // 회원가입 실패 후 처리할 로직
    alert(`회원가입 실패 : ${error}`)
    setIsLoading(false);
  };
  // 로그인
  const {
    mutate: signupMutation,
  } = useSignupMutation(
      handleSignupSuccess,
      handleSignupError
  )
  const handleLoginSuccess = (data) => {
    // 로그인 성공 후 처리할 로직
    setIsLoading(false);
    localStorage.setItem('id_token', data.token.accessToken)
    setSelectCompany(true)
    setIsLoggedIn(true)
  };
  const handleLoginError = (error) => {
    // 로그인 실패 후 처리할 로직
    console.error('로그인 실패:', error);
    setIsLoading(false);
    alert(`로그인 실패 : ${error}`)
  };
  // 로그인
  const {
    mutate: loginMutation,
  } = useLoginMutation(
      handleLoginSuccess,
      handleLoginError
  )

  const handleImageUploadSuccess = (uploadImageData) => {
    setNewItem({ ...newItem, imageUrl:uploadImageData.imageUrl });
    setCardImagePreview(uploadImageData.imageUrl);
  };
  const handleImageUploadError = (error) => {
    // 업로드 실패 후 처리할 로직
    console.error('Upload failed:', error);
  };
  // 이미지 업로드
  const {
    mutate: uploadImageMutation,
  } = useImageUploadMutation(
      handleImageUploadSuccess,
      handleImageUploadError
  );

  const handleBusinessCreateSuccess = (businessData) => {
    // 로그인 성공 후 처리할 로직
    console.log('businessCreate successful:', businessData);
    // 업로드 성공 시 처리 로직
    setCardData([...cardData, newItem]); // 기존 cardData에 새 카드 추가
    // 모달 닫기
    handleClose()
  };
  const handleBusinessCreateError = (error) => {
    // 매장 생성 실패 시 처리 로직
    console.error('businessCreate failed:', error);
  };
  // 매장 생성
  const {
    mutate: businessCreateMutation,
  } = useBusinessCreateMutation(
      handleBusinessCreateSuccess,
      handleBusinessCreateError
  );
  // 회원가입 함수
  const createUser = () => {
    signupMutation({username: loginValue, password: passwordValue});
  };
  // 로그인 함수
  const customLoginUser = () => {
    setIsLoading(true)
    loginMutation({ username: loginValue, password: passwordValue });
  }
  // 매장 카드 데이터 업데이트 함수
  const updateCard = (id, updatedData) => {
    const updatedCards = cardData.map(card => {
      if (card.id === id) {
        return { ...card, ...updatedData };
      }
      return card;
    });
    setCardData(updatedCards);
  };
  const handleAddCard = () => {
    businessCreateMutation(newItem)
  };
  // 매장 생성함수
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setNewItem({ id: '', name: '', description: '', imageUrl: '' })
    setCardImagePreview("")
    setOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };
  const handleCardImageChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    uploadImageMutation(formData)
  };
  return (
    <div>
      {!selectCompany ? (
          <Grid container className={classes.container}>
            <div className={classes.formContainer}>
              <div className={classes.form}>
                <Tabs
                    value={activeTabId}
                    onChange={(e, id) => setActiveTabId(id)}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                  <Tab label="로그인" classes={{ root: classes.tab }} />
                  <Tab label="회원가입" classes={{ root: classes.tab }} />
                </Tabs>
                {activeTabId === 0 && (
                    <React.Fragment>
                      <TextField
                          id="email"
                          InputProps={{
                            classes: {
                              underline: classes.textFieldUnderline,
                              input: classes.textField,
                            },
                          }}
                          value={loginValue}
                          onChange={e => setLoginValue(e.target.value)}
                          margin="normal"
                          placeholder="Email Adress"
                          type="email"
                          fullWidth
                      />
                      <TextField
                          id="password"
                          InputProps={{
                            classes: {
                              underline: classes.textFieldUnderline,
                              input: classes.textField,
                            },
                          }}
                          value={passwordValue}
                          onChange={e => setPasswordValue(e.target.value)}
                          margin="normal"
                          placeholder="Password"
                          type="password"
                          fullWidth
                      />
                      <div className={classes.formButtons}>
                        {isLoading ? (
                            <CircularProgress size={26} className={classes.loginLoader} />
                        ) : (
                            <Button
                                disabled={
                                    loginValue.length === 0 || passwordValue.length === 0
                                }
                                onClick={() =>
                                    customLoginUser()
                                }
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                              Login
                            </Button>
                        )}
                        <Button
                          color="primary"
                          size="large"
                          className={classes.forgetButton}
                        >
                          Forget Password
                        </Button>
                      </div>
                    </React.Fragment>
                )}
                {activeTabId === 1 && (
                    <React.Fragment>
                      <TextField
                          id="email"
                          InputProps={{
                            classes: {
                              underline: classes.textFieldUnderline,
                              input: classes.textField,
                            },
                          }}
                          value={loginValue}
                          onChange={e => setLoginValue(e.target.value)}
                          margin="normal"
                          placeholder="Email Adress"
                          type="email"
                          fullWidth
                      />
                      <TextField
                          id="password"
                          InputProps={{
                            classes: {
                              underline: classes.textFieldUnderline,
                              input: classes.textField,
                            },
                          }}
                          value={passwordValue}
                          onChange={e => setPasswordValue(e.target.value)}
                          margin="normal"
                          placeholder="Password"
                          type="password"
                          fullWidth
                      />
                      <div className={classes.creatingButtonContainer}>
                        {isLoading ? (
                            <CircularProgress size={26} />
                        ) : (
                            <Button
                                onClick={() =>
                                    createUser()
                                }
                                disabled={
                                    loginValue.length === 0 ||
                                    passwordValue.length === 0
                                }
                                size="large"
                                variant="contained"
                                color="primary"
                                fullWidth
                                className={classes.createAccountButton}
                            >
                              Create your account
                            </Button>
                        )}
                      </div>
                    </React.Fragment>
                )}
              </div>
            </div>
          </Grid>
        ) : (
          <Grid container className={classes.selectStoreContainer}>
            <div
                className={classes.customFormContainer}
            >
              <Grid container spacing={2} style={{ marginTop: 50 }}>
                <Grid item xs={12} className={classes.addButtonContainer} >
                  <Button onClick={() => signOut(userDispatch, props.history)} color="secondary">다시 계정으로 로그인하기</Button>
                  <Button onClick={handleOpen} color="primary">매장 추가하기</Button>
                </Grid>
                {cardData.map((data) => (
                    <Grid item xs={12} lg={3} md={6} sm={12} key={data.id}>
                      <CustomCard key={data.id} {...data} updateCard={updateCard} className={classes.marginTop}/>
                    </Grid>
                ))}
              </Grid>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">매장 추가하기</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                  <input
                      accept="image/*"
                      className={classes.display_none}
                      id="raised-button-file"
                      name="imageUrl"
                      type="file"
                      onChange={handleCardImageChange}
                  />
                  <div className={classes.imageUploadCoverContainer}>
                    <div
                        className={classes.imageUploadContainer}
                        style={{
                          backgroundImage: `url(${cardImagePreview})`,
                        }}
                    >
                      {!cardImagePreview && '이미지 업로드'}
                    </div>
                    <label htmlFor="raised-button-file" className={classes.collectionLabel}>
                      <Button variant="contained" component="span" className={classNames(classes.padding_0,classes.minWidth_0)}>
                        <CollectionsIcon/>
                      </Button>
                    </label>
                  </div>
                  <TextField
                      autoFocus
                      margin="dense"
                      name="name"
                      label="매장명"
                      type="text"
                      fullWidth
                      onChange={handleChange}
                      style={{
                        marginTop: "20px"
                      }}
                  />
                  <TextField
                      margin="dense"
                      name="description"
                      label="지점"
                      type="text"
                      fullWidth
                      onChange={handleChange}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="secondary">
                    취소
                  </Button>
                  <Button onClick={handleAddCard} color="primary">
                    추가
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Grid>
        )
      }
    </div>
  );
}

export default withRouter(Login);

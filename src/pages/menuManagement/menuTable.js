import React, {useEffect, useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel, Chip
} from '@material-ui/core';
import useStyles from "./styles";
import CollectionsIcon from "@material-ui/icons/Collections";
import {fetchBusinessItemsInfo, useBusinessItemsUpdateMutation, useImageUploadMutation} from "../../api/mutations";
import {useQuery} from "react-query";
// 데이터 배열을 재정렬하는 함수
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const MenuTable = () => {
  const [totalMenuList, setTotalMenuList] = useState([])
  const [updateMode, setUpdateMode] = useState(false)
  const [newItem, setNewItem] = useState({ name: '', price: '', description: '', category: '',  prompt: "", isActive: true }); // 새 항목의 상태
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기 URL 상태
  const [selectedCategory, setSelectedCategory] = useState('');
  const [menuList, setMenuList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState({})
  const [open, setOpen] = useState(false); // 모달 상태
  const [detailOpen, setDetailOpen] = useState(false)
  const [categoryManageModalOpen, setCategoryManageModalOpen] = useState(false)
  const [newCategory, setNewCategory] = useState('');
  const [updateCategories, setUpdateCategories] = useState([]);
  const { data: businessItemsInfo, isLoading : businessItemsInfoIsLoading, isError: businessItemsInfoIsError } = useQuery('businessItemsInfo', fetchBusinessItemsInfo);
  const handleImageUploadSuccess = (uploadImageData) => {
    setNewItem({ ...newItem, imageUrl:uploadImageData.imageUrl });
    setImagePreview(uploadImageData.imageUrl);
  };
  const handleImageUploadError = (error) => {
    console.error('Upload failed:', error);
  };
  // 이미지 업로드
  const {
    mutate: uploadImageMutation,
  } = useImageUploadMutation(
      handleImageUploadSuccess,
      handleImageUploadError
  );

  const handleBusinessItemsUpdateSuccess = (businessData) => {
    alert("성공적으로 저장했습니다.")
  };
  const handleBusinessItemsUpdateError = (error) => {};
  // 매장 생성
  const {
    mutate: businessItemsUpdateMutation,
  } = useBusinessItemsUpdateMutation(
      handleBusinessItemsUpdateSuccess,
      handleBusinessItemsUpdateError
  );
  useEffect(() => {
    if (!businessItemsInfoIsLoading && !businessItemsInfoIsError && businessItemsInfo) {
      // 데이터가 로드되었고, 에러가 없을 경우 상태 업데이트
      setTotalMenuList(businessItemsInfo.data)
      if(businessItemsInfo.data.length > 0) {
        setSelectedCategory(businessItemsInfo.data[0].category)
        // 숫자 => 문자열 안바뀌면 드래그가 안된다, ㅠㅠ
        const stringIdArray = businessItemsInfo.data[0].items.map(item => ({
          ...item,  // 기존 객체의 모든 속성을 복사
          id: item.id.toString()  // 숫자를 문자열로 변환
        }));
        setMenuList(stringIdArray)
      }
    }
  }, [businessItemsInfo, businessItemsInfoIsLoading, businessItemsInfoIsError]); // 의존성 배열에 businessInfo, isLoading, isError를 추가

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const reorderedItems = reorder(
        menuList,
      result.source.index,
      result.destination.index
    );
    setMenuList(reorderedItems);
    const targetIndex = totalMenuList.findIndex(item => item.category === selectedCategory);
    if (targetIndex !== -1) {
      // totalMenuList의 복사본을 만들고, 해당 카테고리의 items만 업데이트
      const updatedTotalMenuList = totalMenuList.map((item, index) => {
        if (index === targetIndex) {
          return { ...item, items: reorderedItems };
        }
        return item;
      });
      // 업데이트된 전체 메뉴 리스트로 상태 업데이트
      setTotalMenuList(updatedTotalMenuList);
    }
  };
  const handleSave = () => {
    if(window.confirm("저장하시겠습니까?")) {
      let isCheck = true
      let categoryName = ""
      totalMenuList.forEach((categoryList) => {
        if(categoryList.items?.length <= 0) {
          isCheck = false
          categoryName = categoryList.category
        }
        categoryList.items = categoryList.items.map(item => ({
          ...item,  // 기존 객체의 모든 속성을 복사
          id: parseInt(item.id, 10)  // id 속성을 숫자로 변환
        }));
      });
      // 아이템없으면 안된다고해야됩니다.
      if(!isCheck) return alert(`${categoryName} 카테고리 안에 메뉴가 없습니다. 메뉴에 추가하시거나 해당 카테고리를 삭제해주세요.`)
      businessItemsUpdateMutation({
        data:totalMenuList
      })
    }
  };
  const handleAdd = () => {
    setOpen(true);
  };
  // 모달 닫기
  const handleClose = () => {
    setNewItem({ name: '', price: '', description: '', category: selectedCategory, isActive: true })
    setImagePreview(null)
    setOpen(false);
  };
  const handleDetailClose = () => {
    setDetailOpen(false);
  };

  const handleCategoryChange = (e) => {
    const {value} = e.target
    setSelectedCategory(value);
    const filteredItems = totalMenuList.find(item => item.category === value);
    const stringIdArray = filteredItems.items.map(item => ({
      ...item,  // 기존 객체의 모든 속성을 복사
      id: item.id.toString()  // 숫자를 문자열로 변환
    }));
    setMenuList(stringIdArray)
  };
  // 전체 갯수 세는 함수
  function maxCount(data) {
    let maxInt = 0
    data.map((category) => {
      let items = category.items
      if(items !== []) {
        items.map((item) => {
          if(maxInt < parseInt(item.id)) {
            maxInt = parseInt(item.id)
          }
        });
      }
    })
    return maxInt
    // return data.reduce((total, category) => total + category.items.length, 0);
  }
  // 새 항목 추가
  const handleAddItem = () => {
    if(window.confirm("추가하시겠습니까?")) {
      if(!imagePreview) return window.alert("이미지를 업로드 해주세요.")
      if(!newItem.name) return window.alert("메뉴명을 입력해 주세요.")
      if(!newItem.price) return window.alert("가격을 입력해 주세요.")
      if(!newItem.description) return window.alert("설명을 입력해 주세요.")
      newItem.category = selectedCategory
      // const target = totalMenuList.find(item => item.category === selectedCategory);
      // const maxId = target.items.length > 0 ? Math.max(...target.items.map(item => parseInt(item.id, 10))) : 0;
      setMenuList([...menuList, { ...newItem, id: `${maxCount(totalMenuList) + 1}`, imageUrl: imagePreview }]);
      const targetIndex = totalMenuList.findIndex(item => item.category === selectedCategory);
      if (targetIndex !== -1) {
        // 선택된 카테고리를 찾아 해당 items 배열을 업데이트
        const updatedItems = [...totalMenuList[targetIndex].items, { ...newItem, id: `${maxCount(totalMenuList) + 1}`, imageUrl: imagePreview }];
        // totalMenuList의 복사본을 만들고, 해당 카테고리의 items만 업데이트
        const updatedTotalMenuList = totalMenuList.map((item, index) => {
          if (index === targetIndex) {
            return { ...item, items: updatedItems };
          }
          return item;
        });
        // 업데이트된 전체 메뉴 리스트로 상태 업데이트
        setTotalMenuList(updatedTotalMenuList);
      }
      handleClose(); // 모달 닫기
    }
  };

  // 입력 값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };
  // 이미지 변경 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    uploadImageMutation(formData)
  };
  const handleDelete = (id) => {
    // id를 사용하여 menuList에서 해당 항목을 찾아 삭제하는 로직
    // 예: setMenuList(current => current.filter(item => item.id !== id));
    if(window.confirm("해당 메뉴를 삭제하시겠습니까?")) {
      setMenuList(current => current.filter(item => item.id !== id));
      const targetIndex = totalMenuList.findIndex(item => item.category === selectedCategory);
      if (targetIndex !== -1) {
        // 선택된 카테고리를 찾아 해당 items 배열을 업데이트
        const updatedItems = totalMenuList[targetIndex].items.filter(item => item.id !== parseInt(id));
        // totalMenuList의 복사본을 만들고, 해당 카테고리의 items만 업데이트
        const updatedTotalMenuList = totalMenuList.map((item, index) => {
          if (index === targetIndex) {
            return { ...item, items: updatedItems };
          }
          return item;
        });
        // 업데이트된 전체 메뉴 리스트로 상태 업데이트
        setTotalMenuList(updatedTotalMenuList);
      }
      alert("삭제가 완료되었습니다.")
    }
  };

  const handleViewDetails = (id) => {
    // id를 사용하여 상세 정보를 표시하는 로직
    // 상세 정보 모달 열기
    const value = menuList.find(menu => menu.id === id)
    setSelectedMenu(value)
    setDetailOpen(true)
  };
  // 업데이트 버튼 클릭시
  const handleUpdateMenu = () => {
    setDetailOpen(false)
    setOpen(true)
    setUpdateMode(true)
    setNewItem(selectedMenu)
    if(selectedMenu.imageUrl) setImagePreview(selectedMenu.imageUrl)
  }

  const handleUpdateComplete = () => {
    if(window.confirm("해당 메뉴를 수정하시겠습니까?")) {
      const targetIndex = totalMenuList.findIndex(item => item.category === selectedCategory);
      if (targetIndex !== -1) {
        // 선택된 카테고리를 찾아 해당 items 배열에서 아이템을 업데이트
        const updatedItems = totalMenuList[targetIndex].items.map(item => {
          if (`${item.id}` === newItem.id) { // ID가 일치하는 아이템을 찾아 업데이트
            return {...item,
              name: newItem.name,
              description:newItem.description,
              prompt: newItem.prompt,
              imageUrl: imagePreview
            };
          }
          return item; // 그 외 아이템은 그대로 유지
        });
        let setMenuListCustom = updatedItems.map(item => ({
          ...item,  // 기존 객체의 모든 속성을 복사
          id: `${item.id}`  // id 속성을 숫자로 변환
        }));
        setMenuList(setMenuListCustom)
        const updatedTotalMenuList = totalMenuList.map((item, index) => {
          if (index === targetIndex) {
            return { ...item, items: updatedItems };
          }
          return item;
        });
        // // 업데이트된 전체 메뉴 리스트로 상태 업데이트
        setTotalMenuList(updatedTotalMenuList);
      }
      setUpdateMode(false)
      handleClose()
    }
  }
  // 카테고리 추가
  const addCategory = () => {
      const newCategoryData =  {
          category: newCategory,
          items: []
      }
      if (newCategory && !updateCategories.some(category => category.category === newCategory)) {
          setUpdateCategories([...updateCategories,
              newCategoryData
          ]);
          setNewCategory('');
      }
  };
  // 카테고리 삭제
  const deleteCategory = (categoryName) => {
      setUpdateCategories(updateCategories.filter(category => category.category !== categoryName));
  };
  const handleCategoryOpen = () => {
    setUpdateCategories(totalMenuList)
    setCategoryManageModalOpen(true)
  }

  const handleCategoryClose = () => {
    setUpdateCategories(totalMenuList)
    setNewCategory('')
    setCategoryManageModalOpen(false)
  }

  const handleCategorySave = () => {
    setTotalMenuList(updateCategories)
    setCategoryManageModalOpen(false)
  }

  const classes = useStyles();
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="category-select-label">카테고리</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {/* 카테고리 목록을 동적으로 생성 */}
          {totalMenuList.map((item)=> (
            <MenuItem key={item.category} value={item.category}>{item.category}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" className={classes.categoryManageButton} onClick={handleCategoryOpen}>
        카테고리 관리
      </Button>
      <Button variant="contained" color="primary" className={classes.addButton} onClick={handleAdd}>
        추가하기
      </Button>
      <Button onClick={handleSave} variant="contained" className={classes.saveButton} color="secondary">
        저장하기
      </Button>
      <div style={{
        maxWidth: '100%',
        overflowX: 'auto',
      }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppableTable">
            {(provided) => (
                <Table {...provided.droppableProps} ref={provided.innerRef}>
                  <TableHead>
                    <TableRow >
                      <TableCell className={`${classes.textCenter} ${classes.textNowrap}`}>#</TableCell>
                      <TableCell className={`${classes.textCenter} ${classes.textNowrap}`}>이미지</TableCell>
                      <TableCell className={`${classes.textCenter} ${classes.textNowrap}`}>메뉴명</TableCell>
                      <TableCell className={`${classes.textCenter} ${classes.textNowrap}`}>가격</TableCell>
                      <TableCell className={`${classes.textCenter} ${classes.textNowrap}`}>설명</TableCell>
                      <TableCell className={`${classes.textCenter} ${classes.textNowrap}`}>카테고리</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {menuList.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                              <TableRow
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                              >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                  <div style={{
                                    width: "100px",
                                    height: "100px",
                                    marginTop: "10px",
                                    border: "1px solid #ddd",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundImage: `url(${item.imageUrl})`,
                                  }}>
                                    {!item.imageUrl && "NO IMAGE"}
                                  </div>
                                </TableCell>
                                <TableCell className={`${classes.textCenter} ${classes.textNowrap}`}>{item.name}</TableCell>
                                <TableCell className={`${classes.textCenter} ${classes.textNowrap}`}>{item.price}</TableCell>
                                <TableCell className={classes.minWidth300}>{item.description}</TableCell>
                                {/*<TableCell>{item.category}</TableCell>*/}
                                <TableCell>
                                  <Button
                                      style={{
                                        backgroundColor: '#FFFFFF', // 매핑된 색상이 없는 경우 기본 색상
                                        color: '#000000', // 텍스트 색상
                                        whiteSpace: "nowrap"
                                      }}
                                  >
                                    {selectedCategory}
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  <Button onClick={() => handleViewDetails(item.id)} style={{
                                    backgroundColor: '#a3e9f3',
                                  }}
                                  >상세</Button>
                                </TableCell>
                                <TableCell>
                                  <Button onClick={() => handleDelete(item.id)} style={{
                                    backgroundColor: '#FFB6C1',
                                  }}
                                  >삭제</Button>
                                </TableCell>
                              </TableRow>
                          )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                  </TableBody>
                </Table>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {!updateMode ? "메뉴 추가" : "메뉴 수정"}
        </DialogTitle>
        <DialogContent>
          <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center", // 수평 중앙 정렬
          }}>
            <input
                accept="image/*"
                style={{display: 'none'}}
                id="raised-button-file"
                name="logo"
                type="file"
                onChange={handleImageChange}
            />
            <div className={classes.newImageContainer}>
              <div
                  className={classes.newImage}
                  style={{
                    backgroundImage: `url(${imagePreview})`,
                  }}
              >
                {!imagePreview && '이미지 업로드'}
              </div>
              <label htmlFor="raised-button-file" className={classes.uploadBtn}>
                <Button variant="contained" component="span" style={{padding: 0, minWidth: 0}}>
                  <CollectionsIcon/>
                </Button>
              </label>
            </div>
          </div>
          <TextField
              autoFocus
              margin="dense"
              name="name"
              label="메뉴명"
              type="text"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={newItem.name}
              className={classes.textFieldCustom}
          />
          <TextField
            margin="dense"
            name="price"
            label="가격"
            type="number"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            value={newItem.price}
            className={classes.textFieldCustom}
          />
          <TextField
            margin="dense"
            name="description"
            label="설명"
            type="text"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            value={newItem.description}
            className={classes.textFieldCustom}
          />
          <TextField
              margin="dense"
              name="prompt"
              label="키우미에서 메뉴을 설명해주세요."
              type="text"
              multiline
              rows={6}
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={newItem.prompt}
              className={classes.textFieldCustom}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            취소하기
          </Button>
          {!updateMode ?
              <Button onClick={handleAddItem} color="primary">
                추가하기
              </Button>
              :
              <Button onClick={handleUpdateComplete} color="primary">
                수정완료
              </Button>
          }
        </DialogActions>
      </Dialog>

      <Dialog open={detailOpen} onClose={handleDetailClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">상세보기</DialogTitle>
        <DialogContent>
          {/* 이미지 업로드 필드 */}
          <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center", // 수평 중앙 정렬
          }}>
            <div className={classes.newImageContainer}>
              {/* 이미지 미리보기 */}
              <div
                  className={classes.newImage}
                  style={{
                    backgroundImage: `url(${selectedMenu.imageUrl})`,
                  }}
              >
                {!selectedMenu.imageUrl && '이미지 업로드'}
              </div>
            </div>
          </div>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell align="center"
                           className={classes.tableHeaderCell}
                           style={{
                             width: '30%',
                             whiteSpace: "nowrap"}}>
                  메뉴명
                </TableCell>
                <TableCell align="left"
                           style={{width: '70%'}}>
                  {selectedMenu.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center"
                           className={classes.tableHeaderCell}
                           style={{
                             width: '30%',
                             whiteSpace: "nowrap"}}>
                  가격
                </TableCell>
                <TableCell align="left"
                           style={{width: '70%'}}>
                  {selectedMenu.price}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center"
                           className={classes.tableHeaderCell}
                           style={{
                             width: '30%',
                             whiteSpace: "nowrap"}}>
                  설명
                </TableCell>
                <TableCell align="left"
                           style={{width: '70%'}}>
                  {selectedMenu.description}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center"
                           className={classes.tableHeaderCell}
                           style={{
                             width: '30%',
                             whiteSpace: "nowrap"}}>
                  AI 설명
                </TableCell>
                <TableCell align="left"
                           style={{width: '70%'}}>
                  {selectedMenu.prompt}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {/* 상태는 기본적으로 '활성화'로 설정 */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailClose} color="secondary">
            닫기
          </Button>
          <Button onClick={handleUpdateMenu} color="primary">
            수정하기
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={categoryManageModalOpen} onClose={handleCategoryClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">카테고리 관리</DialogTitle>
        <DialogContent>
          <TextField
              label="새 카테고리"
              variant="outlined"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              style={{marginBottom: 16, marginTop: 20}}
          />
          <Button onClick={addCategory} variant="contained" color="primary"
                  style={{marginBottom: 16, marginTop: 30, marginLeft: 10}}>
              카테고리 추가
          </Button>
          <div>
              {updateCategories.length > 0 ? (
                  updateCategories.map((category, index) => (
                      <Chip
                          key={index}
                          label={category.category}
                          onDelete={() => deleteCategory(category.category)}
                          color="primary"
                          style={{margin: '5px'}}
                      />
                  ))
              ) : (
                  <div style={{ margin: '5px' }}>카테고리가 없습니다.</div>
              )}

          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCategoryClose} color="secondary">
            닫기
          </Button>
          <Button onClick={handleCategorySave} color="primary">
            저장하기
          </Button>
        </DialogActions>
      </Dialog>
    </>

  );
};

export default MenuTable;

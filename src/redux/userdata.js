import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk(
  "users/getusers",
  async (payload) => {
    const { skip, searchValue } = payload;
    const response = await axios.get(`https://crud-api-x65b.onrender.com/users?skip=${Number(skip)}&limit=10&term=${searchValue}`);
    return response.data;
  }
);

//İstifadəçi əlavə etmək üçün
export const addUser=createAsyncThunk(
  "users/addUser",
  async(values)=>{
    const response=await axios.post("https://crud-api-x65b.onrender.com/register",values)
    return response
  }
)

//İstifadəçi silmək üçün
export const deleteUser=createAsyncThunk(
    "users/deleteUser",
    async(id)=>{
const response=await axios.delete(`https://crud-api-x65b.onrender.com/users/${id}`)
return response.data
    }
)

//İstifadəçi güncəlləmək üçün
export const updateUser=createAsyncThunk(
  "users/updateUser",
  async(payload)=>{
    const {id,values}=payload
const response=await axios.put(`https://crud-api-x65b.onrender.com/users/${id}`,values)
return response.data
  }
)

export const userData = createSlice({
  name: "userData",
  initialState: {
    users: [],//User datasının başlangıc dəyəri
    loading: false,
    error:null,//GetUSERS funksiyası reject olduqda  dəyişilir və ekranda error göstərmək üçün istifadə edilir
    skip:0,//Prev və Next butonları klik olduqda dəyəri 10 artır və azalır URL-də query olarak ötürülür və bununla APİ-yə nə qədər səhifələmə etməsi olduğunu bildiririk
    total:null,//getusers funksiyasından geri dönən toplam istifadəçi dəyəri bu state-ə ötürülür və bununla db-da nə qədər istifadəçi olduğunu alırıq.Pagination zamanı  istifadə edilir
    searchTerm:"",//İnput elementi change olduqda bu state o inputun dəyərin alır və getUsers funksiyası içində URL-ə query olaraq ötürülür və bu state uyğun istifadəçilər api-dən geri dönür
    successMessage:null,//Bu state delete update və putch post metodları uğurlu olarsa ekranda success bildirimi göstərmək üçün yaradılıb
    errorMessage:null,//Bu state delete update və putch post metodları uğursuz olarsa ekranda error bildirimi göstərmək üçün yaradılıb
},
  reducers: {
    //Bu iki funksiya istifadəçi prev və next butonları ilə səhifələmə edərkən işə düşür.API-ye ne qeder isitfadəçi paginatio etməsini bildirmək üçündür Footer komponentində isitfadə edilir
increaseSkip:(state)=>{
 if(state.total-state.skip>10){
  state.skip+=10;
 }
  console.log(state.skip,state.total)
},
decreaseSkip:(state)=>{
  if(state.skip!==0){
    state.skip-=10;
  }
},
//İsitfadəçi axtarış edərkən searchTerm axtarış olan inputun dəyərin  alır və url-ə query olraq göndərilir Header komponentində isitfadə edilib
changeSearchTerm:(state,action)=>{
state.searchTerm=action.payload.searchTerm
},
//Bu funksiya ekranda error və ya success bildirimi göstərilərsə 3 saniyədən sonra həmin bildirimi ekrandan silmək üçündür Funksiya ErrorAlert və SuccessAlert komponentlərində setTimeout ilə işə düşür
changeSuccessStatus:(state)=>{
  state.successMessage=null;
  state.errorMessage=null;
}
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.total=action.payload.total;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading=false;
      state.error = action.error.message;
    });
    //AddUser funksiyasının uğurlu və uğursuz olmağına uyğun success və ya error bilidirimini göstərmək üçün 
  //Error və success mesajları backenddən göndərmədiyim üçün mesaj mətnini burada təyin etdim
  builder.addCase(addUser.fulfilled,(state)=>{
state.successMessage="User successfully added";
});
builder.addCase(addUser.rejected,(state)=>{
  state.errorMessage="User dont saved";
  });
  //UserDelete funksiyasının uğurlu və uğursuz olmağına uyğun success və ya error bilidirimini göstərmək üçün 
  builder.addCase(deleteUser.fulfilled,(state)=>{
        state.successMessage="User successfully deleted";
    });
    builder.addCase(deleteUser.rejected,(state)=>{
      state.errorMessage="An error occurred while deleting the user";
  });
  //User update funksiyasının uğurlu və uğursuz olmağına uyğun success və ya error bilidirimini göstərmək üçün 
  builder.addCase(updateUser.fulfilled,(state)=>{
    state.successMessage="User successfully updated";
});
builder.addCase(updateUser.rejected,(state)=>{
  state.errorMessage="User not updated";
})
  
  }
});
export const {increaseSkip,decreaseSkip,changeSearchTerm,changeSuccessStatus}=userData.actions
export default userData.reducer;
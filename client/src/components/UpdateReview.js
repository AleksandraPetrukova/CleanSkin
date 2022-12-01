import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {BounceLoader} from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import MyEditor from "./MyEditor";

const UpdateReview = () => {
    const url = "https://api.cloudinary.com/v1_1/dcecm3xxu/image/upload";
    const form = document.querySelector("form");
    const [formData, setFormData] = useState({});
    const [uploadedFile, setUploadedFile] = useState()
    const {reviewId} = useParams()
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState(null)
    const [ratingNumb , setRatingNumb] = useState(null)
    const [newType, setNewType] = useState(null)
    const [prodReview, setProdReview] = useState(null)

    const navigate = useNavigate()
    let numbers =[];
    for (let i = 1; i <= 10; i++) {
        numbers.push(i);
    }
    //two fetches cloudinary post async await in context
    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }
    useEffect(() => {
        fetch(`/get-review/${reviewId}`)
        .then (res => res.json()
        .then(data => {
            // console.log(data.data)
            setName(data.data.productName)
            setRatingNumb(data.data.rating)
            setNewType(data.data.type)
            setProdReview(data.data.review)
            setLoading(false);
        }))
    }, [reviewId]);
    // console.log(user)
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        //file uploaded
        if(uploadedFile){
            const fileData = new FormData();
            // console.log(uploadedFile)
            fileData.append("file", uploadedFile[0]);
            fileData.append("upload_preset", "poi7lhvc");
            const cloudinaryRes = await fetch (url, {
                method: "POST",
                body: fileData
            })
            const cloudinaryData = await cloudinaryRes.json()
            const addReview = await fetch(`/update-review/${reviewId}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...formData, imgSrc: cloudinaryData.secure_url})
            })
            const addReviewNewData = await addReview.json()
            .then(data => {
                navigate("/successfulupdate")
            })
        }
        else {
            const addReview = await fetch(`/update-review/${reviewId}`, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
                })
                const addReviewNewData = await addReview.json()
                .then(data => {
                    navigate("/successfulupdate")
                })
                
        }
    }
    // console.log(ratingNumb)
    if (loading) {
        return <StyledLoader color="#9fe3a1"/>
    }
    return ( 
        <StyledCont>
            <StyledForm onSubmit={handleSubmit}>
                <StyledHeading>Update your review:</StyledHeading>
                <StyledCard>
                    <StyledLabel>Product Name*:</StyledLabel>
                    <StyledInput type="text" id="productName" name="productName" value={name} onChange={(e) => {return (setName(e.target.value), setFormData({...formData, [e.target.id] : e.target.value}))}}/>
                </StyledCard>
                <StyledCard>
                    <StyledLabel>Type*:</StyledLabel>
                    <select type="text" id="type" name="type" onChange={(e) => {return(setNewType(e.target.value),setFormData({...formData, [e.target.id] : e.target.value}))}}>
                        <option value="">Select type of the product</option>
                        <option value="Cleansers" selected={"Cleansers"===newType? "selected":""}>Cleansers</option>
                        <option value="Toners" selected={"Toners"===newType? "selected":""}>Toners</option>
                        <option value="Essences" selected={"Essences"===newType? "selected":""}>Essences</option>
                        <option value="Moisturizers" selected={"Moisturizers"===newType? "selected":""}>Moisturizers</option>
                        <option value="Treatments" selected={"Treatments"===newType? "selected":""}>Treatments</option>
                        <option value="Exfoliators" selected={"Exfoliators"===newType? "selected":""}>Exfoliators</option>
                        <option value="Masks" selected={"Masks"===newType? "selected":""}>Masks</option>
                    </select>
                </StyledCard>
                <StyledCard>
                    <StyledLabel>Your review*:</StyledLabel>
                    <StyledtextArea type="text" id="review" value={prodReview} name="review" onChange={(e) => {return (setProdReview(e.target.value), setFormData({...formData, [e.target.id] : e.target.value}))}}/>
                    {/* <MyEditor setFormData={setFormData} formData={formData} value={prodReview} setProdReview={setProdReview}/> */}
                    {/* Myeditor gives a lot of errors */}
                </StyledCard>
                <div>
                    <StyledLabel>Your rating*:</StyledLabel>
                    <StyledRowNumb>
                        {numbers.map((number) => {
                            return (
                                <StyledRating key={number}>
                                    <input type="radio" name="radiobutton" checked={number==Number(ratingNumb)} value={number} onChange={(e) => {return(setRatingNumb(e.target.value), setFormData({...formData, rating : e.target.value}))}}/>
                                    <label>{number}</label>
                                </StyledRating>
                            )
                        })}
                    </StyledRowNumb>
                </div>
                
                <StyledLabel>Upload your image*:</StyledLabel>
                <input type="file" onChange={(e) => {setUploadedFile(e.target.files)}}></input>
                <StyledFillAbove>*Fill only required fields</StyledFillAbove>
                <StyledButton type="submit">Submit</StyledButton>
            </StyledForm>
        </StyledCont>
    );
}

const StyledFillAbove = styled.div`
    font-size:15px;
    color:gray;
    margin: 10px;
`
const StyledButton = styled.button`
    background-color:#ffc65c;
    border:none;
    font-size: 16px;
    border-radius:5px;
    height:40px;
    margin-top: 20px;
    :hover{
        background-color:#aac26e;
    }
`
//was a textarea before
const StyledtextArea = styled.textarea`
    width: 400px;
    height:150px;
`
const StyledRating = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    gap:5px;
    font-weight:bold;
`
const StyledRowNumb = styled.div`
    display: flex;
    flex-direction:row;
    justify-content: space-evenly;
    margin-top:10px;
`
const StyledCard = styled.div`
    display: flex;
    gap: 20px;
    margin:10px;
`
const StyledLabel = styled.label`
    flex:1;
    font-weight:bold;
    margin-bottom:15px;
`
const StyledInput = styled.input`
    flex:2;
`
const StyledHeading = styled.div`
    font-size:30px;
    border-bottom:3px solid lightgray;
    margin-bottom:40px;
`
const StyledForm = styled.form`
    border: 2px solid lightgray;
    padding: 50px;
    width: 700px;
    display:flex;
    flex-direction:column;
`
const StyledCont = styled.div`
    display: flex;
    /* justify-content:center; */
    margin-top:100px;
    width: 100%;
    margin-bottom:200px;
    align-items:center;
    flex-direction:column;
    
`
const StyledLoader = styled(BounceLoader)`
    position: absolute;
    top: 300px;
    left: 45%;
    z-index: 5;
    margin-bottom:400px;
`
export default UpdateReview;
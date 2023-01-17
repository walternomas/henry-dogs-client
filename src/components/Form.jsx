import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Temperaments from './Temperaments';
import validate from '../utils/validate';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getBreeds } from '../redux/actions';

const Card = styled.div`
  border: solid 2.5px black;
  margin: 13px;
  padding: 13px;
  background-color: #b87741;
`;

const Error = styled.em`
  color: yellow;
  background-color: black;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  gap: 10px 30px;
  margin: 13px;
`;

const Fieldset = styled.fieldset`
  background-color: #b87741;
  border: solid 2.5px black;
  border-radius: 6px;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  flex-shrink: 1;
`;

export default function Form() {

  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  useEffect(() => {
    dispatch(getBreeds()); // eslint-disable-next-line
  }, [])

  const [error, setError] = useState({
    name: "pending",
    height_min: "pending",
    height_max: "pending",
    weight_min: "pending",
    weight_max: "pending",
    life_span_min: "pending",
    life_span_max: "pending",
    temperaments: "pending",
    complete: false,
  });

  const [form, setForm] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span_min: "",
    life_span_max: "",
    temperaments: [],
    image: '',
  });

  const [button, setButton] = useState(true);

  useEffect(() => {
    if (error.complete) {
      setButton(false);
    } else {
      setButton(true);
    }
  }, [form, error]);

  function handleChange(e) {
    setForm((prevState) => {
      const newState = {
        ...prevState,
        [e.target.name]: e.target.value,
      };
      setError(validate(newState, { ...error }, e.target.name, dogs));
      return newState;
    })
  }

  function handleChangeChecks(event) {
    setForm((prevState) => {
      const newState = {
        ...prevState,
        temperaments: [...document.querySelectorAll(".temperaments input[type=checkbox]:checked")].map(e => e.value),
      };
      setError(validate(newState, { ...error }, event.target.name, dogs));
      return newState;
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!error.complete) {
      alert("Please complete all fields correctly.");
    } else {
      try {
        const response = await axios.post("/dogs", form);
        if (response) {
          setError({
            name: "pending",
            height_min: "pending",
            height_max: "pending",
            weight_min: "pending",
            weight_max: "pending",
            life_span_min: "pending",
            life_span_max: "pending",
            temperaments: "pending",
            complete: false,
          });
          setForm({
            name: "",
            weight_min: "",
            weight_max: "",
            height_min: "",
            height_max: "",
            life_span_min: "",
            life_span_max: "",
            temperaments: [],
            image: "",
          })
          document.querySelectorAll(".temperaments input[type=checkbox]:checked").forEach(c => c.checked = false);
          setButton(false);
          setImages([]);
          alert(response.data.message);
        }
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  }

  const [images, setImages] = useState([]);
  const [imageToRemove, setImageToRemove] = useState(null);

  function handleRemoveImg(imgObj) {
    setImageToRemove(imgObj.public_id);
    axios.delete(`/dogs/${imgObj.public_id}`)
      .then(() => {
        setImageToRemove(null);
        setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
        setForm((prevState) => {
          const newState = {
            ...prevState,
            image: '',
          };
          return newState;
        })
      })
      .catch((e) => console.log(e));
  }

  function handleOpenWidget(e) {
    e.preventDefault();
    var myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'dvxnklc1e',
      uploadPreset: 'tn14fppx',
      sources: [
        "local",
        "url",
        "camera",
        "unsplash"
      ],
      multiple: false,
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        images.forEach(image => handleRemoveImg(image)); // remove this line for multiple images
        setImages((prev) => [...prev, {
          url: result.info.url,
          public_id: result.info.public_id
        }])
        setForm((prevState) => {
          const newState = {
            ...prevState,
            image: result.info.url,
          };
          return newState;
        })
      }
    })
    // open widget
    myWidget.open();
  }

  useEffect(() => {
    images.forEach(image => handleRemoveImg(image)); // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header caption="New Breed Registration" />
      <Card>
        <form onSubmit={handleSubmit}>
          <Content>
            <div>
              <Fieldset>
                <legend><strong>Name</strong></legend>
                {/* <label><strong>Name: </strong></label> */}
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  placeholder='Input Name'
                  autoComplete='off'
                  onChange={handleChange}
                /> <br /><Error>{error.name !== "pending" ? error.name : ''}</Error>
              </Fieldset>
              <Fieldset>
                <legend><strong>Weight</strong></legend>
                <label><strong>From</strong></label>
                <input
                  type="number"
                  name="weight_min"
                  value={form.weight_min}
                  placeholder='Input Weight Min'
                  autoComplete='off'
                  onChange={handleChange}
                /> <br /><Error>{error.weight_min !== "pending" ? error.weight_min : ''}</Error>
                <label><strong>To</strong></label>
                <input
                  type="number"
                  name="weight_max"
                  value={form.weight_max}
                  placeholder='Input Weight Max'
                  autoComplete='off'
                  onChange={handleChange}
                /> <br /> <Error>{error.weight_max !== "pending" ? error.weight_max : ''}</Error>
              </Fieldset>
              <Fieldset>
                <legend><strong>Height</strong></legend>
                <label><strong>From</strong></label>
                <input
                  type="number"
                  name="height_min"
                  value={form.height_min}
                  placeholder='Input Height Min'
                  autoComplete='off'
                  onChange={handleChange}
                /> <br /> <Error>{error.height_min !== "pending" ? error.height_min : ''}</Error>
                <label><strong>To</strong></label>
                <input
                  type="number"
                  name="height_max"
                  value={form.height_max}
                  placeholder='Input Height Max'
                  autoComplete='off'
                  onChange={handleChange}
                /> <br /> <Error>{error.height_max !== "pending" ? error.height_max : ''}</Error>
              </Fieldset>
              <Fieldset>
                <legend><strong>Life Span</strong></legend>
                <label><strong>From</strong></label>
                <input
                  type="number"
                  name="life_span_min"
                  value={form.life_span_min}
                  placeholder='Input Life Span Min'
                  autoComplete='off'
                  onChange={handleChange}
                /> <br /> <Error>{error.life_span_min !== "pending" ? error.life_span_min : ''}</Error>
                <label><strong>To</strong></label>
                <input
                  type="number"
                  name="life_span_max"
                  value={form.life_span_max}
                  placeholder='Input Life Span Max'
                  autoComplete='off'
                  onChange={handleChange}
                /> <br /> <Error>{error.life_span_max !== "pending" ? error.life_span_max : ''}</Error>
              </Fieldset>
              <Fieldset>
                <legend><strong>Image</strong></legend>
                <button
                  id='upload-widget'
                  className=''
                  onClick={(e) => handleOpenWidget(e)}
                >
                  Upload picture
                </button><br />
                <div className="images-preview-container">{
                  images.map((image) => (
                    <div key={image.public_id} className='image-preview'>
                      <img src={image.url} alt="dog" />{
                        imageToRemove !== image.public_id &&
                        <i
                          className='fa fa-times-circle close-icon'
                          onClick={() => handleRemoveImg(image)}
                        ></i>
                      }
                    </div>
                  ))}
                </div>
              </Fieldset>
            </div>
            <div>
              <Temperaments fn={handleChangeChecks} />
              <Error>{error.temperaments !== "pending" ? error.temperaments : ''}</Error>
            </div>
          </Content>
          <button
            id='btnSubmit'
            type="submit"
            disabled={button}
            className='bone'
          ><span>Save</span>
          </button>
        </form>
      </Card>
      <Link to='/dogs/' className='bone'>
        <span>Back</span>
      </Link>
      <br /> <br />
    </>
  )
}

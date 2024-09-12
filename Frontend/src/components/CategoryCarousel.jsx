import React from 'react'
import { Button } from "./ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '../redux/jobSlice';

function CategoryCarousel() {
    const category =  [
        "Frontend Developer",
        "Backend Developer",
        "Data Science",
        "Graphic Designer",
        "FullStack Developer"
    ]
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchHandler = (query) => {
      dispatch(setSearchedQuery(query));
      navigate("/browse")
  }

  return (
    <div>
       <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
            {category.map((cat, index) => 
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Button onClick ={() =>searchHandler(cat) } className="rounded-full" variant="outline">{cat}</Button>
            </CarouselItem>
            )}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
        </Carousel> 
    </div>
  )
}

export default CategoryCarousel
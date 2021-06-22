import React, { useState, useEffect } from "react";
import { useSnackbar } from 'notistack';
import Tutorial from "./Tutorial";
import TutorialsForm from "./TutorialsForm";
import TopRatedTutorialsForm from "./TopRatedTutorialsForm";
import { makeStyles } from "@material-ui/styles";
import Button from '@material-ui/core/Button';
import ReactPaginate from 'react-paginate';
import Grid from "@material-ui/core/Grid";
import { videoTutorials } from "../data/dummyTutorialData";

const initialSearchTerms = {
    generalSearchTerm: "",
    tagSearchTerms: ""
};

export default function TutorialsList() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [tutorials, setTutorials] = useState([]);
    const [filterTutorials, setFilterTutorials] = useState([]);
    const [search, setSearch] = useState(initialSearchTerms);

    const [currentPageNum, setCurrentPageNum] = useState(0);
    const [tutorialsPerPage] = useState(4);
    // The previous number of tutorials that have  been displayed in prior pages
    const prevDisplayedTutorialsNum = currentPageNum * tutorialsPerPage;
    const [totalPages, setTotalPages] = useState(0);
    const [likedVideos, setLikedVideos] = useState(['3fda6df9-97aa-4039-ac22-5978e6c73d5f']);

    
    function getVideoTutorials() {
        try {
            const response = videoTutorials;
            if (response) {
                setTutorials(response);
                setFilterTutorials(response);
                setTotalPages(Math.ceil(response.length / tutorialsPerPage));
            }
            
        } catch (error) {
            enqueueSnackbar('Failed to get tutorials, please try again!', {
                variant: 'error'
            });
        }
    }

    const currentPageTutorials = filterTutorials.slice(prevDisplayedTutorialsNum, prevDisplayedTutorialsNum + tutorialsPerPage);

    // This method is called when a page is clicked which exposes the current page object as an argument
    function handlePageChange(e) {
        const selectedPageNum = e.selected;
        setCurrentPageNum(selectedPageNum);
    };

    function searchTermChangeHandler(event) {
        const { name, value } = event.target;
        setSearch({
            ...search,
            [name] : value
        });
    }

    function getTopRatedTutorialsForTags(tagSearchTerms) {
        const tags = tagSearchTerms.split(' ');
        const filteredTutorialsByTags = tutorials.filter(tutorial => {
            const lowerCaseTags = tutorial.tags.flatMap(tag => tag.toLowerCase());
            return tags.some(tag => lowerCaseTags.includes(tag));
        });
        if (filteredTutorialsByTags.length) {
            const sortTutorialsByRating = filteredTutorialsByTags.sort((a, b) => (a.averageUserRating < b.averageUserRating) ? 1 : -1);
            const topRatedTutorials = sortTutorialsByRating.slice(0, 20);
            setFilterTutorials(topRatedTutorials);
            setTotalPages(Math.ceil(topRatedTutorials.length / tutorialsPerPage));
        } else {
            setFilterTutorials(tutorials);
            setTotalPages(Math.ceil(tutorials.length / tutorialsPerPage));
        }
    }

    function searchForTutorials(searchTerm) {
        const term = searchTerm.toLowerCase();
        const filteredTutorials = tutorials.filter(tutorial => {
            const lowerCaseTags = tutorial.tags.flatMap(tag => tag.toLowerCase());
            return tutorial.videoTitle.toLowerCase().includes(term) || tutorial.teacherName.toLowerCase().includes(searchTerm) || lowerCaseTags.includes(searchTerm);
        });
        setTotalPages(Math.ceil(filteredTutorials.length / tutorialsPerPage));
        setFilterTutorials(filteredTutorials);
    }

    useEffect(() => {
        getVideoTutorials();
    }, []);

    useEffect(() => {
        searchForTutorials(search.generalSearchTerm);
    }, [search.generalSearchTerm]);
    
    useEffect(() => {
        getTopRatedTutorialsForTags(search.tagSearchTerms);
    }, [search.tagSearchTerms]);

    return (
        <div>
            <div>
                <Button variant="contained" onClick={getVideoTutorials}> Refresh </Button>
            </div>

            <div className={classes.searchBoxesContainer}>
                <TutorialsForm changeHandler={searchTermChangeHandler} searchTerm={search.generalSearchTerm} />
                <TopRatedTutorialsForm changeHandler={searchTermChangeHandler} searchTerm={search.tagSearchTerms} />
            </div>

            <Grid container justify={"center"} align={"center"} spacing={2}>
                {currentPageTutorials?.map(tutorial => (
                    <Grid item key={tutorial.id}> 
                        <Tutorial key={tutorial.id} {...tutorial} likedVideos={likedVideos} setLikedVideos={setLikedVideos} />
                    </Grid>
                ))}
            </Grid> 

            <div>
                <ReactPaginate
                    previousLabel={"back"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                />
            </div>
        </div>
    );
}

const useStyles = makeStyles({
    searchBoxesContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '.5rem',
        marginBottom: '10px' 
    },
});
  
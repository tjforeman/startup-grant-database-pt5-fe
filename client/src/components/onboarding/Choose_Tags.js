import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../onboarding/onboarding.css';
import Paper from '@material-ui/core/Paper';
import SingleTag from '../onboarding/SingleTag';
import CategoryTags from '../onboarding/CategoryTags';

import { Route, Link } from 'react-router-dom';
import axios from 'axios';

//Styles
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

const initialFounderTags = [
  { key: 0, label: 'Black', selected: false },
  { key: 1, label: 'LBGTQ', selected: false },
  { key: 2, label: 'Asian', selected: false },
  { key: 3, label: 'Women', selected: false },
  { key: 4, label: 'Veteran', selected: false },
  { key: 5, label: 'Student', selected: false },
  { key: 6, label: 'Native American', selected: false }
];

const initialCompanyTags = [
  { key: 7, label: 'Social Mission', selected: false },
  { key: 8, label: 'Agriculture and Biotech', selected: false },
  { key: 9, label: 'AI and Machine Learning=', selected: false },
  { key: 10, label: 'Entertainment', selected: false },
  { key: 11, label: 'Clean and Renewable Energy', selected: false },
  { key: 12, label: 'Health and mental wellness', selected: false },
  { key: 13, label: 'Food and Drink', selected: false },
  { key: 14, label: 'Financial Serices', selected: false },
  { key: 15, label: 'Ecommerce', selected: false },
  { key: 16, label: 'Internet of things', selected: false },
  { key: 17, label: 'Social and Lifestyle', selected: false }
];

//Hooks
const Choose_Tags = () => {
  const classes = useStyles();
  const [founderTags, setFounderTags] = useState(initialFounderTags);
  const [companyTags, setCompanyTags] = useState(initialCompanyTags);

  //Use Effect to load initial data for the dropdowns
  // useEffect(() => {
  //   const fetchAll = async () => {
  //     //Fetch Elegibility
  //     const elegibilityResult = await axios(
  //       'https://startup-grant-database-staging.herokuapp.com/api/elegibility'
  //     );
  //     //Fetch Categories
  //     const categoryResult = await axios(
  //       'https://startup-grant-database-staging.herokuapp.com/api/categories'
  //     );
  //     setFounderTags(elegibilityResult.data);
  //     setCompanyTags(categoryResult.data);
  //   };
  //   fetchAll();
  // }, []);

  //Handle selected tags
  const handleSelected = chipToSelect => () => {
    setFounderTags(founderTags =>
      founderTags.map(chip => {
        if (chip.key === chipToSelect.key) {
          let style = chipToSelect.style == 'secondary' ? '' : 'secondary';
          return {
            ...chipToSelect,
            selected: !chipToSelect.selected,
            style
          };
        }

        return chip;
      })
    );
  };

  const handleCompanySelectedtag = chipToSelect => () => {
    setCompanyTags(companyTags =>
      companyTags.map(chip => {
        if (chip.key === chipToSelect.key) {
          let style = chipToSelect.style == 'secondary' ? '' : 'secondary';
          return {
            ...chipToSelect,
            selected: !chipToSelect.selected,
            style
          };
        }

        return chip;
      })
    );
  };

  const handleSubmit = () => {
    const result = [
      ...founderTags.filter(chip => chip.selected === true),
      ...companyTags.filter(chip => chip.selected === true)
    ];
    console.log(result);
  };

  return (
    <Paper className="paper">
      <br></br>
      <br></br>
      <h1>Choose Tags that apply to your founders</h1>

      {founderTags.map(data => {
        return (
          <SingleTag
            key={data.key}
            {...data}
            data={data}
            classes={classes}
            handleSelected={handleSelected}
          />
        );
      })}
      <br></br>
      <br></br>
      <Link to="/category-tags">
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </Link>
      <Route path="/category-tags" component={CategoryTags} exact />
    </Paper>
  );
};

export default Choose_Tags;

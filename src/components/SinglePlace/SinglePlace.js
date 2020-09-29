import React from 'react';
import './SinglePlace.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
      maxWidth: 500,
    },
    media: {
      height: 250,
    },
  });

const SinglePlace = (props) => {
    console.log(props.place)
    const {id,name,url}=props.place
    const classes = useStyles();
    return (
            <div className="card-container">
                <div>
                   <Link to={"/booking/"+id}>
                   <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={url}
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {name}
                            </Typography>
                            
                            </CardContent>
                        </CardActionArea>
                    
                    </Card>
                   </Link>
                </div>
            </div>
    );
};

export default SinglePlace;

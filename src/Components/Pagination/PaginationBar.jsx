import Pagination from '@material-ui/lab/Pagination';
import { Component } from 'react';
import './PaginationBar.scss'

export default class PaginationBar extends Component{

    changePage = (e, newpage) => {
        this.props.changepage(e, newpage)
    };

    render() {
        return(
            <>
                <div className="paginationBlock">
                    <Pagination count={Math.floor(this.props.books.length / this.props.postsPerPage + 1)}
                        variant="outlined" shape="rounded" color="primary" onChange={this.changePage}
                    />
                </div>
            </>
        )
    }
}
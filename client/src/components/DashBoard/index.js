import './index.css'
import BarApp  from './BarGraph' 
import Header from '../header'

const DashBoardIcons = [{id:1,
    title:'In Progress',
    srce:'https://img.icons8.com/color/48/000000/in-progress--v1.png'
},
{id:2,title:'Approved', srce:'https://img.icons8.com/external-bearicons-glyph-bearicons/64/000000/external-approved-approved-and-rejected-bearicons-glyph-bearicons.png'},
{id:3,title:'Rejected',srce:'https://img.icons8.com/external-bearicons-gradient-bearicons/64/000000/external-rejected-approved-and-rejected-bearicons-gradient-bearicons.png'},
{id:4 ,title:'Total Questions',srce:'https://img.icons8.com/color/48/000000/total-sales-1.png'}
]

const DashBoard = ()=>{
    return(
        <div>
            <Header/>
            <h1 className='top-heading'>Questions DashBoard</h1>
            <div className='dashborad-icons'>
                {DashBoardIcons.map(eachItem =>{return(
                    <div key={eachItem.id} className='icon-container' > 
                      <img alt={eachItem.title} src={eachItem.srce} />
                      <p className='title'>{eachItem.title}</p>
                    </div>)
                })}
            </div>   
            <div className='graph-container'>
                <BarApp/> 
            </div>
        </div>
    )
}

export default DashBoard
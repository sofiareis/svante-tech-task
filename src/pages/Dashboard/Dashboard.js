import CSVParser from '../../components/CSVParser/CSVParser';
import './Dashboard.css';


function Dashboard() {
  return (
    <div className='landing'>
      <h1 className='landing-title'>Dashboard</h1>
      <div className='landing-data'>
        <div className='data-col'>
          <h2 className='data-title'>Time</h2>
          <CSVParser/>
        </div>
        <div className='data-col'>
          <h2 className='data-title'>Concentration</h2>
          <CSVParser/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
import './App.scss';
import CreateContact from './create-contact/create-contact.component';


function App() {
  return (
    <section>
      <div className="container">
        <aside>
          <CreateContact></CreateContact>
        </aside>
      </div>
    </section>
  );
}

export default App;

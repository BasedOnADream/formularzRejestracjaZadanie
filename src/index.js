import react, { useEffect } from 'react';
import dom from 'react-dom/client';
import './index.css';



const Main = () =>
{

    const [countries, setCountries] = react.useState([]);
    const [name, setName] = react.useState('');
    const [surname, setSurname] = react.useState('');
    const [email, setEmail] = react.useState('');
    const [password, setPassword] = react.useState('');
    const [age, setAge] = react.useState(0);
    const [birthDate, setBirthDate] = react.useState('');
    const [country, setCountry] = react.useState('');
    const [gender, setGender] = react.useState('');
    const [marketing, setMarketing] = react.useState(false);

    useEffect(()=>
    {
        fetch("https://countriesnow.space/api/v0.1/countries/")
        .then(res => res.json())
        .then(res => setCountries(res.data))
        .catch(err => console.log(err));
    },[])

    return(
        <main>
            <form>
                <input placeholder='Imię' required minLength="2" onInput={(e)=>setName(e.target.value)}/>
                <input placeholder='Nazwisko' required minLength="2" onInput={(e)=>setSurname(e.target.value)}/>
                <input placeholder='Email' required type='email'  onInput={(e)=>setEmail(e.target.value)}/>
                <input placeholder='Hasło' required type='password' minLength="8" onInput={(e)=>setPassword(e.target.value)}/>
                <input placeholder='Potwierdź hasło' required type='password' minLength="8" id='cp'/>
                <input placeholder='Wiek' required type='number' min="18" max="99" onInput={(e)=>setAge(parseInt(e.target.value))}/>
                <input placeholder='Data urodzenia' required type='date' onInput={(e)=>setBirthDate(e.target.value)}/>
                <select required onInput={(e)=>setCountry(e.target.value)}>
                    {countries.map(i=>
                    {
                        return <option>{i.country}</option>
                    })}
                </select>
                <div>
                    <span>Płeć</span>
                    <input name="plec" id='plecm' value="Mężczyzna" type='radio' onInput={(e)=>setGender(e.target.value)}/>
                    <label for="plecm">Mężczyzna</label>
                    <input name="plec" id='pleck' value="Kobieta" type='radio' onInput={(e)=>setGender(e.target.value)}/>
                    <label for="pleck">Kobieta</label>
                </div>
                <div>
                    <input type='checkbox' name='zgodamarket' id='zm' onInput={(e)=>setMarketing(e.target.value)} />
                    <label for="zm">Zgoda marketinogowa</label>
                </div>
                <div>
                    <input required type='checkbox' name='zgodaregulamin' id='zr'  />
                    <label for="zr">Zgoda na regulamin*</label>
                </div>
                <button type='button' onClick={()=>
                    {
                        document.getElementById('error').innerText = '';
                        if(document.querySelector('form').reportValidity())
                        {
                            if(document.getElementById('cp').value === password)
                            {
                                console.log(new Date(birthDate).getFullYear() + age === new Date(Date.now()).getFullYear());
                                if(new Date(birthDate).getFullYear() + age === new Date(Date.now()).getFullYear())
                                {
                                    console.log(
                                        {
                                            name: name,
                                            surname: surname,
                                            email: email,
                                            password: password,
                                            age: age,
                                            birthDate: birthDate,
                                            country: country,
                                            sex: gender === '' ? 'Nie podano' : gender,
                                            marketing: marketing
                                        });
                                }
                                else{document.getElementById('error').innerText = 'Rok urdozenia i wiek się nie zgadzają';}
                            }
                            else{document.getElementById('error').innerText = 'Hasła nie są takie same';}
                        }
                    }}>Zajerestruj się</button>
                    <p id='error'></p>
                </form>
        </main>
    )
}

const root = dom.createRoot(document.getElementById("root"));
root.render(<Main/>);
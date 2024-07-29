import React, { useState, useEffect, useRef } from 'react';
import Style from './Todo.module.css';

export function Todo() {
    const [inputValue, setInputValue] = useState('');
    const [inputList, setInputList] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editIndex, setEditIndex] = useState(null); 
    const inputRef = useRef(null);

    useEffect(() => {
        if (edit) {
            inputRef.current.focus();
        }
    }, [edit]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) { 
            if (edit) {
                const updatedList = [...inputList];
                updatedList[editIndex] = inputValue;
                setInputList(updatedList);
                setEdit(false); 
                setEditIndex(null);
            } else {
                setInputList([...inputList, inputValue]); 
            }
            setInputValue('');
        }
    }

    const remove = (index) => {
        const newList = [...inputList];
        newList.splice(index, 1);
        setInputList(newList);
    }

    const update = (index) => {
        setEdit(true);
        setEditIndex(index);
        setInputValue(inputList[index]);
    }

    const cancelEdit = () => {
        setEdit(false);
        setEditIndex(null);
        setInputValue('');
    }

    return (
        <div className={Style.main}>
            <h1>TO-DO List</h1>
            <div className={Style.input}>
                <form onSubmit={onSubmit}>
                    <input 
                        type="text" 
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)} 
                        ref={inputRef}
                        required
                    />
                    <div className={Style.inputButtons}>
                        {!edit ? (
                            <input type="submit" value="Add Task" />
                        ) : (
                            <>
                                <input type="submit" value="Update" />
                                <button type="button" onClick={cancelEdit}>Cancel</button>
                            </>
                        )}
                    </div>
                </form>
            </div>
            <div className={Style.displayInput}>
                {inputList.map((item, index) => (
                    <div key={index} className={Style.todoItem}>
                        <p className={Style.todoText}>{item}</p>
                        <div className={Style.actionButtons}>
                            <button onClick={() => update(index)}>Edit</button>
                            <button onClick={() => remove(index)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

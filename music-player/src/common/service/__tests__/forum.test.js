import React from "react"
import { render, fireEvent, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Forum from "../../../pages/forum/Forum"
import {act} from "react-dom/test-utils";
describe("forum testing",()=>{
  beforeAll(() => {
    global.matchMedia = global.matchMedia || function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    };

    global.localStorage = global.localStorage || function () {
      return {
        value: {
          getItem: jest.fn(() => null),
          setItem: jest.fn(() => null)
        },
        writable: true
      };
    };
  });



  it('get comment\'s num big then 2,prove have comments', async () => {
    const container =render(<Forum/>);
    expect(parseInt(container.getByTestId('commentNum').textContent)).toBeGreaterThan(2)
  });

  it('test top Input,and submit ,and save succefully to localStorage',async()=>{
    const container =render(<Forum/>);
    const topInput = container.getByTestId('topInput');
    fireEvent.change(topInput, {target: {value: 'good day!'}});
    expect(topInput.value).toBe('good day!');
    const topBtn = container.getByTestId('topBtn');
    await act(() => fireEvent.click(topBtn))
    const comments = JSON.parse(localStorage.getItem('comments'));
    expect(comments.length).toBeGreaterThan(3)
    expect(comments[comments.length-1].content).toBe('good day!')
  });

  it('test answer',async()=>{
    const container =render(<Forum/>);

    const answerTextAreas = await container.findAllByRole('outerCommentAnswerTextArea')
    fireEvent.change(answerTextAreas[0], {target: {value: 'to answer comment one!'}});
    const answerImgBtns =await  container.findAllByRole('outerCommentAnswerImgBtn');
    await act(() => fireEvent.click(answerImgBtns[0]))

    const comments = JSON.parse(localStorage.getItem('comments'));
    expect(comments[0].commentList[0].content).toBe('to answer comment one!')

    const commentpis = await  container.findAllByRole('commentpis');
    expect(commentpis[0]).toHaveTextContent('to answer comment one!')
  })


  it('test answer in answer',async()=>{
    const container =render(<Forum/>);
    const commentpisanswershows = await container.findAllByRole('commentpisanswershow');
    await act(() => fireEvent.click(commentpisanswershows[0]))
    const commentpisanswerTextAreas = await container.findAllByRole('commentpisanswerTextArea')
    fireEvent.change(commentpisanswerTextAreas[0], {target: {value: 'do answer in anser'}});
    const commentpisanswerImgBtns = await container.findAllByRole('commentpisanswerImgBtn')
    await act(() => fireEvent.click(commentpisanswerImgBtns[0]))
    const comments = JSON.parse(localStorage.getItem('comments'));
    expect(comments[0].commentList[0].answerList[0].content).toBe('do answer in anser')
    const answerlists = await container.findAllByRole('commentpisanswer')
    expect(answerlists[0]).toHaveTextContent('do answer in anser')
  });

  it('test like comment',async()=>{
    const container =render(<Forum/>);
    const likeicons = await container.findAllByRole('likeicon');
    await act(() => fireEvent.click(likeicons[0]))
    const comments = JSON.parse(localStorage.getItem('comments'));
    expect(comments[0].likeList[0].nickName).toBe('hello world1')
    const likeicons2 = await container.findAllByRole('likeicon');
    expect(likeicons2[0]).toHaveStyle('color:rgb(255, 0, 0)')
  });

});

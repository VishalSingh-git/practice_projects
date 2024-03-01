import {
  act,
  cleanup,
  fireEvent,
  getByTestId,
  queryAllByTestId,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import NewPost from "./NewPost";
import axios from "../../__mocks__/axios";
import React from "react";

jest.mock("axios");




afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe("Testing NewPost Component search textField", () => {
  test("test the search Textfield", () => {
    render(<NewPost />);

    const searchTextField = screen.getByLabelText("Search") as HTMLInputElement;
    fireEvent.change(searchTextField, { target: { value: "correct search" } });

    expect(searchTextField.value).toBe("correct search");
  });
});

describe("when Api Call  is successful", () => {
  test("should api return new posts", async () => {
    const responseData = {
      hits: [
        { title: "t1", url: "u1", created_at: "01", author: "a1" },
        { title: "t2", url: "u2", created_at: "02", author: "a2" },
      ],
    };
    axios.get.mockResolvedValueOnce({ data: responseData })

    render(<NewPost />);

    const filtered_0 = await waitFor(() => screen.queryByTestId("filtered-0"));
    console.log(filtered_0);
      await waitFor(() => {
      expect(screen.queryByTestId("filtered-0")).toBeInTheDocument();
    });

    // expect(axios.get).toHaveBeenCalledTimes(1);
    // expect(axios.get).toHaveBeenCalledWith(
    //   "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0"
    // );
  });

  it('should handle error when fetching posts Fails', async () => {

    axios.get.mockRejectedValueOnce(new Error('Failed to fetch data'));
    const consoleSpy = jest.spyOn(console, 'log');
    render(<NewPost />);


  });



});




describe('fetchPosts', () => {
  test('handles failed API call', async () => {
    axios.get.mockRejectedValue(new Error('API call failed'));

    render(<NewPost />);

    // Wait for the error message to appear in the console.log
    // await waitFor(() => {
    //   expect(console.log).toHaveBeenCalledWith('Failed to fetch posts', new Error('API call failed'));
    // });


    // expect(screen.getByText('Failed to fetch posts')).toBeInTheDocument();
  });
});


describe("loading spinner is being displayed when data is being fetched", () => {
  test("testing loading spinner", async () => {
    render(<NewPost />);
    const loader = screen.queryByTestId("loading_spinner");

    expect(loader).toBeNull();
  });
});




describe("Test filtered posts by title and Created At",()=>{

test('search by title', async () => {
  render(<NewPost />);

  const titleElement=screen.getByLabelText("Filter by Title") as HTMLInputElement
  expect(titleElement).toBeInTheDocument()
  console.log((titleElement));


fireEvent.change(titleElement,{target:{value:"Title"}})
expect(titleElement.value).toBe("Title")

});

test("search by Created At",()=>{
  render(<NewPost />);
  const createdAtElement=screen.getByLabelText("Filter by Created At") as HTMLInputElement

  expect(createdAtElement).toBeInTheDocument()
  fireEvent.change(createdAtElement,{target:{value:"date"}})
expect(createdAtElement.value).toBe("date")

})

})



describe("should call fetch post  when fetchin in progress is false",()=>{
  // Before your tests
 const useRef=jest.fn();

test("should call fetch",()=>{

  const mockRef={current:false}



})
})




describe.only("Testing handleClickedRow ", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });


  const fetchPosts = jest.fn();

  it("increments the count every second", async() => {
    render(<NewPost  />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });


    const row_0= await screen.getByTestId('filtered-0')
console.log(row_0);
expect(row_0).toBeInTheDocument()
    // expect(fetchPosts).toHaveBeenCalled();
  });



    // expect(document.querySelector('p').textContent).toBe('Count: 1');

    // // Fast-forward time by another second
    // act(() => {
    //   jest.advanceTimersByTime(1000);
    // });

    // expect(document.querySelector('p').textContent).toBe('Count: 2');
  });

  test("handleClickedRow should set selected post and open model",async () => {
    const responseData = {
      hits: [
        { title: "t1", url: "u1", created_at: "01", author: "a1" },
        { title: "t2", url: "u2", created_at: "02", author: "a2" },
      ],
    };
    axios.get.mockResolvedValueOnce({ data: responseData })

    const handleRowClicked = jest.fn();
    await act(async() => {
      await render(<NewPost />)
    })

  // const { getByTestId } = render(  <NewPost  />);


//     const row_0= await screen.getByTestId('filtered-0')
// console.log(row_0);

// const row = await waitFor(()=>queryByTestId("filtered-0"))
// console.log(row);

    // fireEvent.click(row);

  // expect(handleRowClicked).toHaveBeenCalled();



});



























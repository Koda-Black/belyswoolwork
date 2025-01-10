import React, { useState } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : `/search`);
  };

  return (
    <Form className="d-flex me-auto" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search products..."
          aria-label="search products..."
          aria-describedby="button-search"
          //   style={{ outline: "2px solid #28a745", outlineOffset: "2px" }}
        ></FormControl>
        <Button variant="outline-success" type="submit" id="button-search">
          <IoSearch />
        </Button>
      </InputGroup>
    </Form>
  );
}

import { useCallback, useContext, useEffect, useReducer } from "react";
import debounce from "lodash.debounce";
import { useQuery } from "@apollo/client";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { SelectInput } from "../../../../components/SelectInput/SelectInput";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { GET_CATEGORIES } from "../../../../graphql/queries/getCategories";
import {
  calendarFieldCSS,
  SearchContainer,
  selectFieldCSS,
  textFieldCSS,
} from "./SearchBar.styles";
import { buildCategories } from "../../../../utils/buildCategories";

const dateFormat = "YYYY-MM-DD";
const defaultSearchQuery = {
  reference: "",
  category: "",
  account: "",
  startDate: null,
  endDate: null,
};

const searchQueryReducer = (state, { name, value }) => {
  return {
    ...state,
    [name]: value,
  };
};

export function SearchBar() {
  const { data: getCategoriesData } = useQuery(GET_CATEGORIES);
  const categoriesOpts = buildCategories(getCategoriesData?.categories);

  const { refetch, setPage } = useContext(TransactionsContext);
  const [searchQuery, setsearchQuery] = useReducer(
    searchQueryReducer,
    defaultSearchQuery
  );

  const onSubmit = () => {
    const queryVariables = { ...searchQuery };
    Object.keys(queryVariables).forEach((key) => {
      if (queryVariables[key] === "") {
        queryVariables[key] = undefined;
      }
    });

    refetch(queryVariables).then(() => {
      setPage(1);
    });
  };

  const debouncedSubmit = useCallback(debounce(() => onSubmit(), 1000, []));

  useEffect(() => {
    debouncedSubmit();
  }, [searchQuery]);

  const onChangeInput = (name, value) => {
    setsearchQuery({ name, value });
  };

  return (
    <>
      {getCategoriesData && (
        <SearchContainer>
          <TextInput
            name="reference"
            label="Reference"
            css={textFieldCSS}
            onChange={(e) => onChangeInput(e.target.name, e.target.value)}
            value={searchQuery?.reference}
            placeholder="Search by reference..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              disableFuture
              name="startDate"
              onChange={(value) =>
                onChangeInput("startDate", value.startOf('month').format(dateFormat))
              }
              value={searchQuery?.startDate}
              views={["year", "month"]}
              openTo="year"
              label="Starting Month"
              css={calendarFieldCSS}
              renderInput={(params) => <TextInput {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              disableFuture
              name="endDate"
              onChange={(value) =>
                onChangeInput("endDate", value.endOf('month').format(dateFormat))
              }
              value={searchQuery?.endDate}
              views={["year", "month"]}
              openTo="year"
              label="Ending Month"
              renderInput={(params) => <TextInput {...params} />}
              css={calendarFieldCSS}
            />
          </LocalizationProvider>
          <SelectInput
            name="category"
            onChange={(e) => onChangeInput("category", e.target.value)}
            value={searchQuery?.category}
            label="Category"
            opts={categoriesOpts}
            css={selectFieldCSS}
            placeholder="No filter applied"
          />
        </SearchContainer>
      )}
    </>
  );
}

import { PrimaryButton, SecondaryButton } from "./Button";

export const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
}: {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}) => (
  <div className="p-2 row justify-center align-center gap-2">
    <PrimaryButton
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage <= 1}>
      Previous
    </PrimaryButton>

    <div className="row gap-half">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (number) => (
          <SecondaryButton
            key={number}
            onClick={() => handlePageChange(number)}
            className={
              currentPage === number ? "btn-primary" : "btn-secondary"
            }>
            {number}
          </SecondaryButton>
        )
      )}
    </div>

    <PrimaryButton
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage >= totalPages}>
      Next
    </PrimaryButton>
  </div>
);

using FluentValidation;
using backend.Hypesoft.Application.Queries;

namespace backend.Hypesoft.Application.Validators
{
    public class GetProductsByCategoryQueryValidator : AbstractValidator<GetProductsByCategoryQuery>
    {
        public GetProductsByCategoryQueryValidator()
        {
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.PageNumber).GreaterThan(0);
            RuleFor(x => x.PageSize).InclusiveBetween(1, 100);
        }
    }
}
